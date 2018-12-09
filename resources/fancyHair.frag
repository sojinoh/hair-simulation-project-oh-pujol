#version 330

// Fragment shader

uniform vec3 eye_world;

uniform float r0;
uniform float m;

// These get passed in from the vertex shader and are interpolated (varying) properties
// change for each pixel across the triangle:
in vec4 interpSurfPosition;
in vec3 interpSurfTangent;
in vec3 color;


// This is an out variable for the final color we want to render this fragment.
out vec4 fragColor;

// TODO: add other material properties variables
uniform vec3 ambientReflectionCoeff;
uniform vec3 diffuseReflectionCoeff;
uniform vec3 specularReflectionCoeff;

// TODO: Light Properties
uniform vec3 ambientLightIntensity;
uniform vec3 diffuseLightIntensity;
uniform vec3 specularLightIntensity;

uniform vec4 lightPosition;

void main() {
    
    vec3 T = normalize(interpSurfTangent);
    vec3 E = normalize(eye_world - interpSurfPosition.xyz);
    vec3 BN = cross(T, E);
    vec3 N = cross(BN, T);
    vec3 L = normalize(lightPosition.xyz-interpSurfPosition.xyz);
    vec3 H = normalize(L+E);
    float NdotH = clamp(dot(N,H), 0.0, 1.0);
    float EdotH = clamp(dot(E,H), 0.0, 1.0);
    float NdotE = clamp(dot(N,E), 0.0, 1.0);
    float NdotL = clamp(dot(N,L), 0.0, 1.0);
    
    //Calculating N components
    
	// Tell OpenGL to use the r,g,b compenents of finalColor for the color of this fragment (pixel).
    if (color == vec3(0)){
        fragColor = vec3(1.0,1.0,1.0,1.0);
    }
    else{
        fragColor = HairLighting(T, N);
    }
}

vec3 ShiftTangent (vec3 T, vec3 N, float shift){
    vec3 shiftedT = T + shift * N;
    return normalize(shiftedT);
}

float StrandSpecular (vec3 T, vec3 E, vec3 L, float exponent){
    vec3 H = normalize(L+E);
    float TdotH = dot(T,H);
    float sinTH = sqrt(1.0 - TdotH*TdotH);
    float dirAtten = smoothstep(-1.0, 0.0, TdotH);
    return dirAtten * pow(sinTH, exponent);
}

vec4 HairLighting(vec3 T, vec3 N, vec3 L, vec3 E, vec2 uv, float ambOcc){
    // shift tangents
    float shiftTex = tex2D(tSpecShift, uv) - 0.5;
    vec3 t1 = ShiftTangent(T, N, primaryShift + shiftTex);
    vec3 t2 = ShiftTangent(T, N, secondaryShift + shiftTex);
    
    // diffuse lighting: the lerp shifts the shadow boundary for a softer look
    vec3 diffuse = saturate(lerp(0.25, 1.0, dot(N,L)));
    diffuse *= diffuseColor;
    
    // specualr lighting
    vec3 specular = specularColor1 * StrandSpecular(t1, E, L, specExp1);
    
    // add second specular term, modulated with noise texture
    float specMask = tex2D(tSpecMask, uv); // approximate sparkles using texture
    specular += specularColor2 * specMask * StrandSpecular(t2, E, L, specExp2);
    
    // final color assembly
    vec4 c;
    c.rgb = (diffuse + specular)  * tex2D (tBase, uv) * lightColor;
    c.rgb = *= ambOcc; // modulate color by ambient occlusion term
    c.a = tex2D(tAlpha, uv) // read alpha texture
}
