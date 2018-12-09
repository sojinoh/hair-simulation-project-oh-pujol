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
const vec4 FILL_LIGHT_POS = vec4(-2.0, 1.0, 1.0, 1.0);
const float FILL_LIGHT_INTENSITY_HAIR = 0.6;

// Textures
uniform sampler2D diffuseRamp;
uniform sampler2D specularRamp;

uniform vec3 eye_world;
uniform mat4 projection_mat;
uniform vec4 lightPosition;
uniform mat4 view_mat;
uniform mat4 lightView;

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
    vec4 toLight_N = normalize(lightPosition_ES - position_ES);
    vec3 tangent_N = normalize(tangent_ES);
    vec3 toEye_N = normalize(-position_ES.xyz);
    vec3 h_N = normalize(toEye_N + toLight_N.xyz);
    
    float diffuse = sqrt(1. - abs(dot(tangent_N, toLight_N.xyz)));
    float specular = pow(sqrt(1. - abs(dot(tangent_N, h_N))), HAIR_SHININESS);
    
    // Add color variation
    vec3 colorMultiplier = vec3(1.0 + colorVariation * (2.0 * colorVariation - 1.0));
    
    // Add color gradient
    colorMultiplier *= mix(MIN_COLOR, 1.0, smoothstep(MIN_COLOR_END, MAX_COLOR_START, interpSurfPosition.x));
    
    return (vec3(0.6, 0.6, 0.6) * diffuse + vec3(1.0, 1.0, 1.0) * specular) * color * colorMultiplier;
}

void main() {
    float colorVariation = color.r; //colorVariation_te = texture(noiseTexture, triangleFace[0].xy*gl_TessCoord.yy).r;
    mat4 eyeToLight = projection_mat * lightView * inverse(view_mat);
    vec4 position_lightSpace = eyeToLight * interpSurfPosition;
    vec4 color;
    
    // Key light
    vec4 lightPos = view_mat * vec4(lightPosition);
    color.xyz = colorContribution(interpSurfPosition, interpSurfTangent, lightPos, colorVariation);
    //color.xyz *= GetTransparencyArray()(position_lightSpace);
    
    // Fill light
    lightPos = view_mat * FILL_LIGHT_POS;
    color.xyz += FILL_LIGHT_INTENSITY_HAIR * colorContribution(interpSurfPosition, interpSurfTangent, lightPos, colorVariation);
    
    fragColor.xyz = color.xyz;
    
    fragColor.a = 1.0;
}
