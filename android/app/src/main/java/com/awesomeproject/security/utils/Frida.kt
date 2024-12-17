package com.awesomeproject.security.utils

import com.example.app.utils.decodeToString
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
        // frida-server
        val fridaServer = intArrayOf(90,110,74,112,90,71,69,116,99,50,86,121,100,109,86,121)
        // frida
        val frida = intArrayOf(90,110,74,112,90,71,69,61)
        // gum-js-loop
        val gumJsLoop = intArrayOf(90,51,86,116,76,87,112,122,76,87,120,118,98,51,65,61)
        // FRIDA
        val FRIDA = intArrayOf(82,108,74,74,82,69,69,61)
        val knownFridaProcesses = arrayOf(fridaServer.decodeToString(), frida.decodeToString(), gumJsLoop.decodeToString(), FRIDA.decodeToString())
        println("mouliTesting - isFridaServerRunning - ${knownFridaProcesses.joinToString(", ")}")
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
        // /data/local/tmp/frida-server
        val fridaServer = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,100,71,49,119,76,50,90,121,97,87,82,104,76,88,78,108,99,110,90,108,99,103,61,61)
        // /data/local/tmp/re.frida.server
        val reFridaServer = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,100,71,49,119,76,51,74,108,76,109,90,121,97,87,82,104,76,110,78,108,99,110,90,108,99,103,61,61)
        // /data/local/tmp/fs0
        val fs0 = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,100,71,49,119,76,50,90,122,77,65,61,61)
        // /data/local/tmp/fs1
        val fs1 = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,100,71,49,119,76,50,90,122,77,81,61,61)
        // /data/local/tmp/fs2
        val fs2 = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,100,71,49,119,76,50,90,122,77,103,61,61)
        val knownFridaFiles = arrayOf(
            fridaServer.decodeToString(), reFridaServer.decodeToString(),
            fs0.decodeToString(), fs1.decodeToString(), fs2.decodeToString()
        )
        println("mouliTesting - isFridaArtifactPresent - ${knownFridaFiles.joinToString(", ")}")
        for (filePath in knownFridaFiles) {
            val file = File(filePath)
            if (file.exists()) {
                return true
            }
        }
        return false
    }

    private fun isFridaLibraryLoaded(): Boolean {
        // libfrida-gadget.so
        val gadgetSo = intArrayOf(98,71,108,105,90,110,74,112,90,71,69,116,90,50,70,107,90,50,86,48,76,110,78,118)
        // libfrida-agent.so
        val agentSo = intArrayOf(98,71,108,105,90,110,74,112,90,71,69,116,89,87,100,108,98,110,81,117,99,50,56,61)
        val knownFridaLibraries = arrayOf(gadgetSo.decodeToString(), agentSo.decodeToString())
        try {
            // /proc/self/maps
            val maps = intArrayOf(76,51,66,121,98,50,77,118,99,50,86,115,90,105,57,116,89,88,66,122)
            println("mouliTesting - isFridaLibraryLoaded - \n" +
                    "knownFridaLibraries - ${knownFridaLibraries.joinToString(", ")}\n" +
                    "maps - ${maps.decodeToString()}")
            BufferedReader(FileReader(maps.decodeToString())).use { reader ->
                var isLibraryLoaded = false
                reader.forEachLine { line ->
                    if (knownFridaLibraries.any { lib -> line.contains(lib) }) {
                        isLibraryLoaded = true
                        return@forEachLine
                    }
                }
                return isLibraryLoaded
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return false
    }
}
