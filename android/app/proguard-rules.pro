# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Advanced Optimization and Aggressive Obfuscation Settings
-optimizations !code/allocation/variable,!field/*,!class/unboxing/enum,!method/marking/private,!code/removal/advanced
-optimizationpasses 9
-allowaccessmodification
-dontpreverify
-repackageclasses 'o'
-flattenpackagehierarchy 'o'
-overloadaggressively
-useuniqueclassmembernames
-mergeinterfacesaggressively

# Enable all optimizations except those that are known to cause issues
-optimizations !code/simplification/arithmetic,!code/simplification/cast,!field/*,!class/merging/*,!code/allocation/variable
-keepattributes Exceptions,InnerClasses,Signature,Deprecated,SourceFile,LineNumberTable,*Annotation*,EnclosingMethod

# Advanced code optimization
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-verbose

# Aggressive optimization settings
-allowaccessmodification
-mergeinterfacesaggressively
-overloadaggressively
-repackageclasses ''
-flattenpackagehierarchy ''

# String Encryption Protection
#-keep class com.awesomeproject.StringEncryption {
#    private static final char[] KEY;
#    public static java.lang.String decrypt(java.lang.String);
#}
#-assumenosideeffects class com.awesomeproject.StringEncryption {
#    public static java.lang.String encrypt(...);
#}

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

# Remove toString() methods
#-assumenosideeffects class java.lang.Object {
#    public java.lang.String toString();
#}

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
-keepattributes InnerClasses,EnclosingMethod
-repackageclasses 'o'
-allowaccessmodification
-mergeinterfacesaggressively

# Mapping for debugging (keep secure)
-printmapping mapping.txt
-verbose
