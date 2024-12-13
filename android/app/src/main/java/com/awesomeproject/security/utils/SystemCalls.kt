package com.awesomeproject.security.utils

import java.io.BufferedReader
import java.io.InputStreamReader

object SystemCalls {
    fun detect(): Boolean {
        val suspiciousSysCalls = arrayOf("ptrace", "mprotect")
        for (sysCall in suspiciousSysCalls) {
            if (isSysCallUsed(sysCall)) {
                return true
            }
        }
        return false
    }

    private fun isSysCallUsed(sysCallName: String): Boolean {
        try {
            val process = Runtime.getRuntime().exec("strace -e $sysCallName")
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