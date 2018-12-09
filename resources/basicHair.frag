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
    
    float D = exp(-pow(tan(acos(NdotH)),2)/pow(m,2))/(4*pow(m,2)*pow(NdotH,4));
    float F = r0+(1.0-r0)*pow((1.0-EdotH),5);
    float G = min(1.0, min((2*NdotH*NdotE)/EdotH, (2*NdotH*NdotL)/EdotH));
    
    vec3 ambient = ambientReflectionCoeff * ambientLightIntensity;
    vec3 diffuse = diffuseReflectionCoeff * diffuseLightIntensity * NdotL;
    vec3 specular = specularReflectionCoeff * specularLightIntensity * max(0.0, ((D*F*G)/NdotE));
    
    //Calculating N components
    
	// Tell OpenGL to use the r,g,b compenents of finalColor for the color of this fragment (pixel).
    if (color == vec3(0)){
        fragColor.rgb = vec3(1.0,1.0,1.0);
    }
    else{
        fragColor.rgb = color + specular;
    }

	// And, set the alpha component to 1.0 (completely opaque, no transparency).
	fragColor.a = 1.0;
}
