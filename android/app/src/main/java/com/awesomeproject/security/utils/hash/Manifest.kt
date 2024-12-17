package com.awesomeproject.security.utils.hash

import android.content.Context
import com.example.app.utils.decodeToString
import java.io.File
import java.security.MessageDigest
import java.util.zip.ZipFile

object Manifest {

  fun isValid(context: Context): Boolean {
    val buildTimeHash = manifestHash.decodeToString()
    val manifestFile = extractManifestFile(context)

    if (manifestFile != null) {
      val manifestHash = computeFileHash(manifestFile)
      return buildTimeHash == manifestHash
    }
    return false
  }

  private fun extractManifestFile(context: Context): File? {
    val apkPath = context.applicationInfo.sourceDir
    // extracted_manifest
    val extractedManifest = intArrayOf(90,88,104,48,99,109,70,106,100,71,86,107,88,50,49,104,98,109,108,109,90,88,78,48)
    val outputDir = context.getDir(extractedManifest.decodeToString(), Context.MODE_PRIVATE)

    // AndroidManifest.xml
    val androidManifestFile = intArrayOf(81,87,53,107,99,109,57,112,90,69,49,104,98,109,108,109,90,88,78,48,76,110,104,116,98,65,61,61)
    val manifestFile = File(outputDir, androidManifestFile.decodeToString())

    println("mouliTesting - Manifest - extractManifestFile - extractedManifest: ${extractedManifest.decodeToString()}\n" +
            "androidManifestFile - ${androidManifestFile.decodeToString()}")
    ZipFile(apkPath).use { zipFile ->
      val entry = zipFile.getEntry(androidManifestFile.decodeToString())
      entry?.let {
        zipFile.getInputStream(it).use { input ->
          manifestFile.outputStream().use { output ->
            input.copyTo(output)
          }
        }
        return manifestFile
      }
    }
    return null
  }

  private fun computeFileHash(file: File): String {
    val buffer = ByteArray(1024)

    // SHA_256
    val SHA_256 = intArrayOf(85,48,104,66,76,84,73,49,78,103,61,61)
    println("mouliTesting - Manifest - computeFileHash - SHA_256 - ${SHA_256.decodeToString()}")
    val digest = MessageDigest.getInstance(SHA_256.decodeToString())

    file.inputStream().use { inputStream ->
      var bytesRead = inputStream.read(buffer)
      while (bytesRead != -1) {
        digest.update(buffer, 0, bytesRead)
        bytesRead = inputStream.read(buffer)
      }
    }

    return digest.digest().joinToString("") { "%02x".format(it) }
  }
}
