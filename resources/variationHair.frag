#version 330

// Fragment shader

// Hair gradient
const float MIN_COLOR = 0.5;
const float MIN_COLOR_END = 0.0;
const float MAX_COLOR_START = 0.3;

//         MIN_COLOR       mix(MIN_COLOR, 1.0, ...)           1.0
// root------------------|--------------------------|--------------------tip
//                 MIN_COLOR_END     MAX_COLOR_START

// Hair material properties
const float HAIR_SHININESS = 50.0;

// Fill light properties
const float FILL_LIGHT_INTENSITY_HAIR = 0.6;

uniform vec3 eye_world;
uniform mat4 projection_mat;
uniform vec4 lightPosition;
uniform mat4 view_mat;
uniform mat4 lightView;
uniform vec3 diffuseLightIntensity;
uniform vec3 specularLightIntensity;

// These get passed in from the vertex shader and are interpolated (varying) properties
// change for each pixel across the triangle:
in vec4 interpSurfPosition;
in vec3 interpSurfTangent;
in vec3 color;

// This is an out variable for the final color we want to render this fragment.
out vec4 fragColor;
vec3 colorContribution(
in vec4 position_ES, in vec3 tangent_ES, in vec4 lightPosition_ES, in float colorVariation)
{
    vec4 L = normalize(lightPosition_ES - position_ES); //light vector
    vec3 T = normalize(tangent_ES); //tangent vector
    vec3 E = normalize(eye_world - position_ES.xyz); //eye vector
    
    vec3 H = normalize(E + L.xyz); //half vector
    
    float diffuse = sqrt(1.0 - abs(dot(T, L.xyz)));
    float specular = pow(sqrt(1.0 - abs(dot(T, H))), HAIR_SHININESS);
    
    // Add color variation
    vec3 colorMultiplier = vec3(1.0 + colorVariation * (2.0 * colorVariation - 1.0));

    return (diffuseLightIntensity * diffuse + specularLightIntensity * specular) * color;
}

void main() {
    float colorVariation = color.r;
    mat4 eyeToLight = projection_mat * lightView * inverse(view_mat);
    vec4 position_lightSpace = eyeToLight * interpSurfPosition;
    vec4 color;
    
    // Key light
    vec4 lightPos = view_mat * vec4(lightPosition);
    color.xyz = colorContribution(interpSurfPosition, interpSurfTangent, lightPos, colorVariation);
    
    // Fill light
    lightPos = view_mat * lightPosition;
    color.xyz += FILL_LIGHT_INTENSITY_HAIR * colorContribution(interpSurfPosition, interpSurfTangent, lightPos, colorVariation);
    fragColor.xyz = color.xyz;
    fragColor.a = 1.0;
}
