package com.awesomeproject.security.utils

import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.io.IOException
import java.io.InputStreamReader

object Frida {
    fun isDetected(): Boolean {
        return (isFridaServerRunning() || isFridaArtifactPresent() || isFridaLibraryLoaded())
    }

    private fun isFridaServerRunning(): Boolean {
        val knownFridaProcesses = arrayOf("frida-server", "frida", "gum-js-loop", "FRIDA")
        for (process in knownFridaProcesses) {
            if (isProcessRunning(process)) {
                return true
            }
        }
        return false
    }

    private fun isProcessRunning(processName: String): Boolean {
        try {
            val process = Runtime.getRuntime().exec("ps")
            val reader = BufferedReader(InputStreamReader(process.inputStream))
            var line: String
            while ((reader.readLine().also { line = it }) != null) {
                if (line.contains(processName)) {
                    return true
                }
            }
            reader.close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return false
    }

    private fun isFridaArtifactPresent(): Boolean {
        val knownFridaFiles = arrayOf(
            "/data/local/tmp/frida-server", "/data/local/tmp/re.frida.server",
            "/data/local/tmp/fs0", "/data/local/tmp/fs1", "/data/local/tmp/fs2"
        )
        for (filePath in knownFridaFiles) {
            val file = File(filePath)
            if (file.exists()) {
                return true
            }
        }
        return false
    }

    private fun isFridaLibraryLoaded(): Boolean {
        val knownFridaLibraries = arrayOf("libfrida-gadget.so", "libfrida-agent.so")
        try {
            val reader = BufferedReader(FileReader("/proc/self/maps"))
            var line: String
            while ((reader.readLine().also { line = it }) != null) {
                for (lib in knownFridaLibraries) {
                    if (line.contains(lib)) {
                        reader.close()
                        return true
                    }
                }
            }
            reader.close()
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return false
    }
}
