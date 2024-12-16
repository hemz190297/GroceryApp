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

      println("MouliTesting - Manifest Hash: \n" +
        "CompileTime - ${buildTimeHash} \n" +
        "RunTime - $manifestHash \n")

      return buildTimeHash == manifestHash
    }
    return false
  }

  private fun extractManifestFile(context: Context): File? {
    val apkPath = context.applicationInfo.sourceDir
    val outputDir = context.getDir("extracted_manifest", Context.MODE_PRIVATE)
    val manifestFile = File(outputDir, "AndroidManifest.xml")

    ZipFile(apkPath).use { zipFile ->
      val entry = zipFile.getEntry("AndroidManifest.xml")
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
    val digest = MessageDigest.getInstance("SHA-256")

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
