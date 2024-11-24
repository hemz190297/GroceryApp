# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# -keepattributes LineNumberTable,SourceFile
# -renamesourcefileattribute SourceFile


-dontskipnonpubliclibraryclasses
-dontskipnonpubliclibraryclassmembers

-printusage printUsage_Deadcode.txt
-printconfiguration printConfiguration.txt
-printmapping printMapping.txt
-printseeds printSeeds.txt
-dump dump.txt

-verbose
-addconfigurationdebugging

-optimizationpasses 5
-allowaccessmodification

-flattenpackagehierarchy ''
-repackageclasses ''
-forceprocessing

-renamesourcefileattribute ''
-useuniqueclassmembernames
-keepattributes SourceFile,LineNumberTable,*Annotation*
