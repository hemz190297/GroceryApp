package com.awesomeproject.security.utils

import com.example.app.utils.SECURITY_LOG_TAG
import com.example.app.utils.decodeToString
import java.io.BufferedReader
import java.io.InputStreamReader

object SystemCalls {
    fun isDetected(): Boolean {
        // ptrace
        val ptrace = intArrayOf(99,72,82,121,89,87,78,108)
        // mprotect
        val mprotect = intArrayOf(98,88,66,121,98,51,82,108,89,51,81,61)
        val suspiciousSysCalls = arrayOf(ptrace.decodeToString(), mprotect.decodeToString())
        println("${SECURITY_LOG_TAG.decodeToString()} - SystemCalls.isDetect - suspiciousSysCalls: ${suspiciousSysCalls.joinToString(", ")}")
        for (sysCall in suspiciousSysCalls) {
            if (isSysCallUsed(sysCall)) {
                return true
            }
        }
        return false
    }

    private fun isSysCallUsed(sysCallName: String): Boolean {
        try {
            // strace -e
            val strace = intArrayOf(99,51,82,121,89,87,78,108,73,67,49,108)
            println("${SECURITY_LOG_TAG.decodeToString()} - SystemCalls.isSysCallUsed - strace: ${strace.decodeToString()}")
            val process = Runtime.getRuntime().exec("${strace.decodeToString()} $sysCallName")
            val reader = BufferedReader(InputStreamReader(process.inputStream))
            var line: String
            while ((reader.readLine().also { line = it }) != null) {
                if (line.contains(sysCallName)) {
                    return true
                }
            }
            reader.close()
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return false
    }
}
