package com.awesomeproject.security.utils

import android.os.Build
import com.example.app.utils.SECURITY_LOG_TAG
import com.example.app.utils.decodeToString
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader

object Root {

    fun isDetected(): Boolean {
        return checkRootMethod1() || checkRootMethod2() || checkRootMethod3()
    }

    private fun checkRootMethod1(): Boolean {
        // test-keys
        val testKeys = intArrayOf(100,71,86,122,100,67,49,114,90,88,108,122)
        println("${SECURITY_LOG_TAG.decodeToString()} - checkRootMethod1 - testKeys: ${testKeys.decodeToString()}")
        val buildTags = Build.TAGS
        return buildTags != null && buildTags.contains(testKeys.decodeToString())
    }

    private fun checkRootMethod2(): Boolean {
        // /system/app/Superuser.apk
        val superUser = intArrayOf(76,51,78,53,99,51,82,108,98,83,57,104,99,72,65,118,85,51,86,119,90,88,74,49,99,50,86,121,76,109,70,119,97,119,61,61)
        // /sbin/su
        val sbinSu = intArrayOf(76,51,78,105,97,87,52,118,99,51,85,61)
        // /system/bin/su
        val systemBinSu = intArrayOf(76,51,78,53,99,51,82,108,98,83,57,105,97,87,52,118,99,51,85,61)
        // /system/xbin/su
        val systemXbinSu = intArrayOf(76,51,78,53,99,51,82,108,98,83,57,52,89,109,108,117,76,51,78,49)
        // /data/local/xbin/su
        val dataLocalXbinSu = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,101,71,74,112,98,105,57,122,100,81,61,61)
        // /data/local/bin/su
        val dataLocalBinSu = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,89,109,108,117,76,51,78,49)
        // /system/sd/xbin/su
        val systemSdXbinSu = intArrayOf(76,51,78,53,99,51,82,108,98,83,57,122,90,67,57,52,89,109,108,117,76,51,78,49)
        // /system/bin/failsafe/su
        val systemBinFailsafeSu = intArrayOf(76,51,78,53,99,51,82,108,98,83,57,105,97,87,52,118,90,109,70,112,98,72,78,104,90,109,85,118,99,51,85,61)
        // /data/local/su
        val dataLocalSu = intArrayOf(76,50,82,104,100,71,69,118,98,71,57,106,89,87,119,118,99,51,85,61)
        // /su/bin/su
        val suBinSu = intArrayOf(76,51,78,49,76,50,74,112,98,105,57,122,100,81,61,61)
        val paths = arrayOf(
            superUser.decodeToString(),
            sbinSu.decodeToString(),
            systemBinSu.decodeToString(),
            systemXbinSu.decodeToString(),
            dataLocalXbinSu.decodeToString(),
            dataLocalBinSu.decodeToString(),
            systemSdXbinSu.decodeToString(),
            systemBinFailsafeSu.decodeToString(),
            dataLocalSu.decodeToString(),
            suBinSu.decodeToString()
        )
        println("${SECURITY_LOG_TAG.decodeToString()} - checkRootMethod2 - paths: ${paths.joinToString(", ")}")
        for (path in paths) {
            if (File(path).exists()) return true
        }
        return false
    }

    private fun checkRootMethod3(): Boolean {
        var process: Process? = null
        try {
            // /system/xbin/which
            val which = intArrayOf(76,51,78,53,99,51,82,108,98,83,57,52,89,109,108,117,76,51,100,111,97,87,78,111)
            // su
            val su = intArrayOf(99,51,85,61)
            println("${SECURITY_LOG_TAG.decodeToString()} - checkRootMethod3 - ${arrayOf(which.decodeToString(), su.decodeToString()).joinToString(", ")}")
            process = Runtime.getRuntime().exec(arrayOf(which.decodeToString(), su.decodeToString()))
            return process.inputStream.bufferedReader().useLines { lines ->
                lines.any()
            }
        } catch (t: Throwable) {
            return false
        } finally {
            process?.destroy()
        }
    }
}
