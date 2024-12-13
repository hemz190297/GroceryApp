package com.awesomeproject.security

import android.app.Activity
import android.content.Context
import android.content.Intent
import com.awesomeproject.security.utils.DeveloperOptions
import com.awesomeproject.security.utils.Frida
import com.awesomeproject.security.utils.Root
import com.awesomeproject.security.utils.SystemCalls


private fun isMethodHooked(
    cls: Class<*>,
    methodName: String,
    vararg parameterTypes: Class<*>
): Boolean {
    try {
        val method = cls.getDeclaredMethod(methodName, *parameterTypes)
        val originalCode =
            method.toString().toByteArray() // Placeholder for actual method bytecode
        val currentCode = method.toString().toByteArray()
        return !originalCode.contentEquals(currentCode)
    } catch (e: Exception) {
        e.printStackTrace()
        return true
    }
}

enum class SecurityType {
    Frida,
    SystemCalls,
    Root,
    DeveloperOptions,
    None
}


object SecurityService {

    private fun getSecurityType(context: Context): SecurityType {
        if (Frida.isDetected()) {
            return SecurityType.Frida
        }
        if (SystemCalls.detect()) {
            return SecurityType.SystemCalls
        }
        if (Root.detect()) {
            return SecurityType.Root
        }
        if (DeveloperOptions.detect(context)) {
            return SecurityType.DeveloperOptions
        }
        return SecurityType.None
    }

    private fun getTitleAndMessageForSecurityType(type: SecurityType): Pair<String, String> {
        return when (type) {
            SecurityType.Frida -> Pair("Frida server detected", "It has the potential to dynamically analyze and manipulate the behaviour of the app. This application is not supported.")
            SecurityType.SystemCalls -> Pair("System calls detected", "It has the potential to inspect and manipulate the state of the app. This application is not supported.")
            SecurityType.Root -> Pair("Device is rooted", "This application is not supported on rooted device.")
            SecurityType.DeveloperOptions -> Pair("USB Debugger/developer Option is ON", "This application is not supported on USB debugging enabled device.")
            SecurityType.None -> Pair("No security issues detected", "This application is not supported.")
        }
    }

    private fun launchSecurityActivity(activityContext: Activity, title: String, message: String) {
        val intent: Intent = Intent(activityContext, SecurityIssueActivity::class.java)
        intent.putExtra("title", title)
        intent.putExtra("message", message)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        activityContext.startActivity(intent)
    }

    fun checkAndBlockHacker(activityContext: Activity, callback: (title: String, message: String) -> Unit) {
        val type = getSecurityType(activityContext)
        val (title, message) = getTitleAndMessageForSecurityType(type)
        callback(title, message)
        launchSecurityActivity(activityContext, title, message)
    }

}