# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Advanced Optimization and Aggressive Obfuscation Settings
-optimizationpasses 9
-allowaccessmodification
-dontpreverify
-repackageclasses ''
-flattenpackagehierarchy ''
-overloadaggressively
-useuniqueclassmembernames
-mergeinterfacesaggressively

# Advanced code optimization
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses

# Aggressive name obfuscation
-obfuscationdictionary proguard-dictionary.txt
-classobfuscationdictionary proguard-dictionary.txt
-packageobfuscationdictionary proguard-dictionary.txt

# Control Flow Obfuscation
-dontskipnonpubliclibraryclassmembers
-keeppackagenames donotkeep

# Keep important information but remove debugging
-renamesourcefileattribute ''
-keepattributes SourceFile,LineNumberTable

# React Native specific rules (keep only essential parts)
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep native methods (with aggressive obfuscation)
-keepclasseswithmembernames class * {
    native <methods>;
}

# Essential Android components (with aggressive obfuscation)
-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider

# Remove all logging
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
    public static int w(...);
    public static int e(...);
}

# Additional security measures
-keepclassmembers class * implements java.io.Serializable {
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# Advanced string and class protection
-adaptclassstrings
-adaptresourcefilecontents **.properties,META-INF/MANIFEST.MF,META-INF/*.properties,META-INF/*.xml

# Mapping for debugging (keep secure)
-printmapping mapping.txt
-verbose
