#include "ExampleApp.h"
#include <string.h>
#include "cyHairFile.h"

#define FONTSTASH_IMPLEMENTATION
#include <fontstash.h>
#define GLFONTSTASH_IMPLEMENTATION
#include <glfontstash.h>

#include <config/VRDataIndex.h>

ExampleApp::ExampleApp(int argc, char** argv) : VRApp(argc, argv)
{
	//_lastTime = 0.0;

}

ExampleApp::~ExampleApp()
{
    delete[]dirs;
	shutdown();
}

void ExampleApp::onAnalogChange(const VRAnalogEvent &event) {
    // This routine is called for all Analog_Change events.  Check event->getName()
    // to see exactly which analog input has been changed, and then access the
    // new value with event->getValue().
    
	//if (event.getName() == "FrameStart") {
	//	_lastTime = _curFrameTime;
	//	_curFrameTime = event.getValue();
	//}


}

void ExampleApp::onButtonDown(const VRButtonEvent &event) {
    // This routine is called for all Button_Down events.  Check event->getName()
    // to see exactly which button has been pressed down.
	//You can respond to individual events like this:
	/*
    if (event.getName() == _paintOnEvent) {
        _painting = true;
    }
    else if (event.getName() == _grabOnEvent) {
        _grabbing = true;
    }
	*/

	//std::cout << "ButtonDown: " << event.getName() << std::endl;

}

void ExampleApp::onButtonUp(const VRButtonEvent &event) {
    // This routine is called for all Button_Up events.  Check event->getName()
    // to see exactly which button has been released.

	//std::cout << "ButtonUp: " << event.getName() << std::endl;
}

void ExampleApp::onCursorMove(const VRCursorEvent &event) {
	// This routine is called for all mouse move events. You can get the absolute position
	// or the relative position within the window scaled 0--1.
	
	//std::cout << "MouseMove: "<< event.getName() << " " << event.getPos()[0] << " " << event.getPos()[1] << std::endl;
}

void ExampleApp::onTrackerMove(const VRTrackerEvent &event) {
    // This routine is called for all Tracker_Move events.  Check event->getName()
    // to see exactly which tracker has moved, and then access the tracker's new
    // 4x4 transformation matrix with event->getTransform().

	// We will use trackers when we do a virtual reality assignment. For now, you can ignore this input type.
}

void ExampleApp::reloadShaders()
{
    _shader.compileShader("hair.vert", GLSLShader::VERTEX);
    _shader.compileShader("hair.frag", GLSLShader::FRAGMENT);
    _shader.link();
    _shader.use();
}

void ExampleApp::onRenderGraphicsContext(const VRGraphicsState &renderState) {
    // This routine is called once per graphics context at the start of the
    // rendering process.  So, this is the place to initialize textures,
    // load models, or do other operations that you only want to do once per
    // frame.
    
	// Is this the first frame that we are rendering after starting the app?
    if (renderState.isInitialRenderCall()) {

		//For windows, we need to initialize a few more things for it to recognize all of the
		// opengl calls.
		#ifndef __APPLE__
			glewExperimental = GL_TRUE;
			GLenum err = glewInit();
			if (GLEW_OK != err)
			{
				std::cout << "Error initializing GLEW." << std::endl;
			}
		#endif     


        glEnable(GL_DEPTH_TEST);
        glClearDepth(1.0f);
        glDepthFunc(GL_LEQUAL);

		glEnable(GL_CULL_FACE);
		glCullFace(GL_BACK);

		glEnable(GL_MULTISAMPLE);

		// This sets the background color that is used to clear the canvas
		glClearColor(0.2f, 0.2f, 0.2f, 1.0f);

		// This load shaders from disk, we do it once when the program starts up.
		reloadShaders();
        
        _modelMesh.reset(new Model("straight.hair", 1.0, vec4(1.0)));
        
        LoadHairModel("straight.hair", hair, dirs);
    }
}

void ExampleApp::onRenderGraphicsScene(const VRGraphicsState &renderState) {
    // This routine is called once per eye/camera.  This is the place to actually
    // draw the scene.
    
	// clear the canvas and other buffers
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT | GL_STENCIL_BUFFER_BIT);

	// Setup the view matrix to set where the camera is located in the scene
	glm::vec3 eye_world = glm::vec3(0, 0, 5);
	glm::mat4 view = glm::lookAt(eye_world, glm::vec3(0, 0, 0), glm::vec3(0, 1, 0));
	// When we use virtual reality, this will be replaced by:
	// eye_world = glm::make_vec3(renderState.getCameraPos())
	// view = glm::make_mat4(renderState.getViewMatrix());

	// Setup the projection matrix so that things are rendered in perspective
	GLfloat windowHeight = renderState.index().getValue("FramebufferHeight");
	GLfloat windowWidth = renderState.index().getValue("FramebufferWidth");
	glm::mat4 projection = glm::perspective(glm::radians(45.0f), windowWidth / windowHeight, 0.01f, 100.0f);
	// When we use virtual reality, this will be replaced by:
	// projection = glm::make_mat4(renderState.getProjectionMatrix())
	
	// Setup the model matrix
	glm::mat4 model = glm::mat4(1.0);
    
	// Tell opengl we want to use this specific shader.
	_shader.use();
	
	_shader.setUniform("view_mat", view);
	_shader.setUniform("projection_mat", projection);
	
	_shader.setUniform("model_mat", model);
	_shader.setUniform("normal_mat", mat3(transpose(inverse(model))));
	_shader.setUniform("eye_world", eye_world);
    
    //_shader.setUniform("lightPosition", _lightPosition);
    
     DrawHairModel(hair, dirs);
}

void ExampleApp::LoadHairModel( const char *filename, cyHairFile &hairfile, float *&dirs )
{
    // Load the hair model
    int result = hairfile.LoadFromFile( filename );
    // Check for errors
    switch( result ) {
        case CY_HAIR_FILE_ERROR_CANT_OPEN_FILE:
            printf("Error: Cannot open hair file!\n");
            return;
        case CY_HAIR_FILE_ERROR_CANT_READ_HEADER:
            printf("Error: Cannot read hair file header!\n");
            return;
        case CY_HAIR_FILE_ERROR_WRONG_SIGNATURE:
            printf("Error: File has wrong signature!\n");
            return;
        case CY_HAIR_FILE_ERROR_READING_SEGMENTS:
            printf("Error: Cannot read hair segments!\n");
            return;
        case CY_HAIR_FILE_ERROR_READING_POINTS:
            printf("Error: Cannot read hair points!\n");
            return;
        case CY_HAIR_FILE_ERROR_READING_COLORS:
            printf("Error: Cannot read hair colors!\n");
            return;
        case CY_HAIR_FILE_ERROR_READING_THICKNESS:
            printf("Error: Cannot read hair thickness!\n");
            return;
        case CY_HAIR_FILE_ERROR_READING_TRANSPARENCY:
            printf("Error: Cannot read hair transparency!\n");
            return;
        default:
            printf("Hair file \"%s\" loaded.\n", filename);
    }
    int hairCount = hairfile.GetHeader().hair_count;
    int pointCount = hairfile.GetHeader().point_count;
    printf("Number of hair strands = %d\n", hairCount );
    printf("Number of hair points = %d\n", pointCount );
    
    dirs = new float[3 * pointCount];
    // Compute directions
    if( hairfile.FillDirectionArray( dirs ) == 0 ) {
        printf("Error: Cannot compute hair directions!\n");
    }
    
    // create the vao
    glGenVertexArrays(1, &_vaoID);
    glBindVertexArray(_vaoID);
    
    // create the vbo
    glGenBuffers(1, &_vertexVBO);
    glBindBuffer(GL_ARRAY_BUFFER, _vertexVBO);
    
    int allocateVertexByteSize = 3*(3*sizeof(float)*pointCount);
    
    // initialize size
    glBufferData(GL_ARRAY_BUFFER, allocateVertexByteSize, NULL, GL_STATIC_DRAW);
    
    int dataByteSize = 3*sizeof(float)*pointCount;
    //buffer data
    glBufferSubData(GL_ARRAY_BUFFER, 0, dataByteSize, hairfile.GetPointsArray());
    glBufferSubData(GL_ARRAY_BUFFER, dataByteSize, dataByteSize, dirs);
    glBufferSubData(GL_ARRAY_BUFFER, 2*dataByteSize, dataByteSize, hairfile.GetColorsArray());
    
    // set up vertex attributes
    glEnableVertexAttribArray(0);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 0, reinterpret_cast<void*>(0));
    glEnableVertexAttribArray(1);
    glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 0, reinterpret_cast<void*>(dataByteSize));
    glEnableVertexAttribArray(2);
    glVertexAttribPointer(2, 3, GL_FLOAT, GL_FALSE, 0, reinterpret_cast<void*>(2*dataByteSize));
    
    // unbind the vao
    glBindVertexArray(0);
    
    
}

void ExampleApp::DrawHairModel( const cyHairFile &hairfile, float *dirs )
{
    glBindVertexArray(_vaoID);
    
    // Draw arrays
    int pointIndex = 0;
    int hairCount = hairfile.GetHeader().hair_count;
    const unsigned short *segments = hairfile.GetSegmentsArray();
    if ( segments ) {
        std::cout <<"yes" << std::endl;
        // If segments array exists
        for ( int hairIndex=0; hairIndex < hairCount; hairIndex++ ) {
            glDrawArrays( GL_LINE_STRIP, pointIndex, segments[ hairIndex ]+1 );
            pointIndex += segments[ hairIndex ]+1;
        }
    } else {
        std::cout <<"no" << std::endl;
        // If segments array does not exist, use default segment count
        int dsegs = hairfile.GetHeader().d_segments;
        for ( int hairIndex=0; hairIndex < hairCount; hairIndex++ ) {
            glDrawArrays( GL_LINE_STRIP, pointIndex, dsegs+1 );
            pointIndex += dsegs+1;
        }
    }
    
    glBindVertexArray(0);
}
