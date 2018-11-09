# DO NOT EDIT
# This makefile makes sure all linkable targets are
# up-to-date with anything they link to
default:
	echo "Do not invoke directly"

# Rules to remove targets that are older than anything to which they
# link.  This forces Xcode to relink the targets from scratch.  It
# does not seem to check these dependencies itself.
PostBuild.basicgraphics-example.Debug:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/Debug/basicgraphics-example:\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libBasicGraphics.a\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/minvr/build/install/lib/MinVR-2.0/libMinVRd.a\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libassimp.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libIrrXML.a\
	/usr/lib/libz.dylib\
	/usr/lib/libz.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libSOIL.a
	/bin/rm -f /Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/Debug/basicgraphics-example


PostBuild.basicgraphics-example.Release:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/Release/basicgraphics-example:\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libBasicGraphics.a\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/minvr/build/install/lib/MinVR-2.0/libMinVRd.a\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libassimp.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libIrrXML.a\
	/usr/lib/libz.dylib\
	/usr/lib/libz.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libSOIL.a
	/bin/rm -f /Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/Release/basicgraphics-example


PostBuild.basicgraphics-example.MinSizeRel:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/MinSizeRel/basicgraphics-example:\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libBasicGraphics.a\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/minvr/build/install/lib/MinVR-2.0/libMinVRd.a\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libassimp.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libIrrXML.a\
	/usr/lib/libz.dylib\
	/usr/lib/libz.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libSOIL.a
	/bin/rm -f /Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/MinSizeRel/basicgraphics-example


PostBuild.basicgraphics-example.RelWithDebInfo:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/RelWithDebInfo/basicgraphics-example:\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libBasicGraphics.a\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/minvr/build/install/lib/MinVR-2.0/libMinVRd.a\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libassimp.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libIrrXML.a\
	/usr/lib/libz.dylib\
	/usr/lib/libz.dylib\
	/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libSOIL.a
	/bin/rm -f /Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics-example/build/RelWithDebInfo/basicgraphics-example




# For each target create a dummy ruleso the target does not have to exist
/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.14.sdk/System/Library/Frameworks/OpenGL.framework/OpenGL.tbd:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libBasicGraphics.a:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libIrrXML.a:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libSOIL.a:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/basicgraphics/build/install/lib/libassimp.dylib:
/Users/sojinoh/Dropbox/MAC/2018Fall/Graphics/code/minvr/build/install/lib/MinVR-2.0/libMinVRd.a:
/usr/lib/libz.dylib:
