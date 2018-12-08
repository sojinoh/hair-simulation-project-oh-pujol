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
uniform float specularExponent;

void main() {

    //Setting parameters
    vec3 u = ; //tangent to the hair, pointing in the direction from the root toward the tip
    vec3 w = ; //normal to the hair, pointing toward the viewer (the geometry faces the camera)
    vec3 v = ; //binormal to the hair, pointing such that v and w complete a right-handed orthonormal basis, and are the v–w is the normal plane
    vec3 w_i = ; //direction of illumination (light)
    vec3 w_r = ; //direction of camera (viewer)
    float q_ir = ; //inclinations with respect to the normal plane (measured so that 0 is perpendicular to the hair, PI is u, and –PI is –u)
    float f_ir = ; //azimuths around the hair (measured so that v is 0 and w is +PI)
    
    vec3 q_i = ;
    vec3 q_r = ;
    vec3 f_i = ;
    vec3 f_r = ;
    
    q d = (q r – q i )/2; //the difference angle
    f = (f r – f i ); //the relative azimuth
    q h = (q i + q r )/2; //half angle
    f h = (f i + f r )/2; //half angle
    
    //Calculating M components
    ((1.0f / (fabs(sigma) * sqrt(2.0f * PI))) *
    exp(-(x_mu * x_mu) / (2.0f * sigma * sigma)));
    
    //Calculating N components
    
	// Tell OpenGL to use the r,g,b compenents of finalColor for the color of this fragment (pixel).
    if (color == vec3(0)){
        fragColor.rgb = vec3(5.0,5.0,5.0);
    }
    else{
        fragColor.rgb = color;
    }

	// And, set the alpha component to 1.0 (completely opaque, no transparency).
	fragColor.a = 1.0;
}
