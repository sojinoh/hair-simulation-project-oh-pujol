#version 330

// Fragment shader

uniform vec3 eye_world;


// These get passed in from the vertex shader and are interpolated (varying) properties
// change for each pixel across the triangle:
in vec4 interpSurfPosition;
in vec3 interpSurfTangent;
in vec3 color;

//Marschner constants
uniform sampler2D lookUp1;
uniform sampler2D lookUp2;

// This is an out variable for the final color we want to render this fragment.
out vec4 fragColor;

uniform vec4 lightPosition;

void main() {
    
    vec3 T = normalize(interpSurfTangent);
    vec3 E = normalize(eye_world - interpSurfPosition.xyz);
    vec3 L = normalize(lightPosition.xyz-interpSurfPosition.xyz);
    
    float AmbientCol = 0.0;
    float DiffuseCol = 0.75;
    int PointLightColor = 1;
    
    // Compute longitudinal angles
    vec2 fuv1;
    vec3 angles;
    fuv1.x = dot(L, T);
    fuv1.y = dot(E, T);
    angles.xy = 0.5 + 0.5*fuv1;
    
    // Compute the azimuthal angle
    vec3 lightPerp = L - fuv1.x*T;
    vec3 eyePerp = E - fuv1.y*T;
    float cosPhi = dot(E,L)*inversesqrt(dot(eyePerp,eyePerp)*dot(lightPerp,lightPerp));
    angles.z = 0.5*cosPhi + 0.5;
    
    vec4 diffuseColor;
    vec3 ambientColor;
    float diffuse = sqrt(max(0, 1 - fuv1.x*fuv1.x));
    diffuseColor.rgb = diffuse*color*DiffuseCol;
    ambientColor = color * AmbientCol;
    
    float Rcol = 1.87639;
    float TTcol = 3.70201;
    
    // Compute the longitudinal reflectance component
    vec2 uv1 = angles.xy;
    vec4 m = texture(lookUp1, uv1);
    
    // Compute the azimuthal reflectance component
    vec2 uv2;
    uv2.x = cos((asin(2 * angles.x - 1) - asin(2 * angles.y - 1)) / 2) * 0.5 + 0.5;
    uv2.y = angles.z;
    vec4 ntt = texture(lookUp2,uv2);
    
    vec3 lighting;
    float x = m.r * ntt.a * Rcol;
    lighting = vec3(x,x,x);
    lighting = m.b * ntt.rgb * TTcol;
    lighting += diffuseColor.rgb;
    
    vec4 col;
    col.rgb = lighting + diffuseColor.rgb*0.2 + ambientColor;
    col.a = diffuseColor.a;
    
    if (color == vec3(0)){
        fragColor = vec4(1.0,1.0,1.0,1.0);
    }
    else{
        fragColor = col;
    }
}
