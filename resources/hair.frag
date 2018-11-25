#version 330

// Fragment shader

// Textures
uniform sampler2D diffuseRamp;
uniform sampler2D specularRamp;

uniform vec3 eye_world;

// These get passed in from the vertex shader and are interpolated (varying) properties
// change for each pixel across the triangle:
in vec4 interpSurfPosition;
in vec3 interpSurfNormal;

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
uniform float specularExponent;

void main() {

    // Start with black and then add lighting to the final color as we calculate it
	vec3 finalColor = vec3(0.0, 0.0, 0.0);

    // TODO: Calculate ambient, diffuse, and specular lighting for this pixel based on its position, normal, etc.
    vec3 N = normalize(interpSurfNormal);
    vec3 E = normalize(eye_world - interpSurfPosition.xyz);
    vec3 L = normalize(lightPosition.xyz-interpSurfPosition.xyz);
    vec3 H = normalize(L+E);
    float NdotH = clamp(dot(N,H), 0.0, 1.0);
    float NdotL = clamp(dot(N,L), 0.0, 1.0);
    
    
    
    vec3 ambient = ambientReflectionCoeff * ambientLightIntensity;
    vec3 diffuse = diffuseReflectionCoeff * diffuseLightIntensity * texture(diffuseRamp, vec2(NdotL, 0.0)).rgb;
    vec3 specular = specularReflectionCoeff * specularLightIntensity * texture(specularRamp, vec2(pow(NdotH, specularExponent)), 0.0).rgb;
    vec3 diffuseText;
    vec3 specularText;
    
    if (dot(N,L) < 0){
        diffuse = vec3(0,0,0);
    }
    if (dot(N,H) < 0){
        specular = vec3(0,0,0);
    }
    
    finalColor += ambient + diffuse + specular;
    
	// Tell OpenGL to use the r,g,b compenents of finalColor for the color of this fragment (pixel).
    fragColor.rgb = finalColor;

	// And, set the alpha component to 1.0 (completely opaque, no transparency).
	fragColor.a = 1.0;
}
