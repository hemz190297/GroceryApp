package com.awesomeproject.security

import android.app.Activity
import android.content.Context
import android.content.Intent
import com.awesomeproject.security.utils.AppIntegrity
import com.awesomeproject.security.utils.DeveloperOptions
import com.awesomeproject.security.utils.Emulator
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
    Emulator,
    AppIntegrity,
    None
}


object SecurityService {

    private fun getSecurityType(context: Context): SecurityType {
        if (Frida.isDetected()) {
            return SecurityType.Frida
        }
        if (SystemCalls.isDetected()) {
            return SecurityType.SystemCalls
        }
        if (Root.isDetected()) {
            return SecurityType.Root
        }
        if (DeveloperOptions.isDetected(context)) {
            return SecurityType.DeveloperOptions
        }
        if (Emulator.isDetected(context)) {
          return SecurityType.Emulator
        }
        if (AppIntegrity.isValid(context).not()) {
          return SecurityType.AppIntegrity
        }
        return SecurityType.None
    }

    private fun getTitleAndMessageForSecurityType(type: SecurityType): Pair<String, String> {
        return when (type) {
            SecurityType.Frida -> Pair("Frida server detected", "It has the potential to dynamically analyze and manipulate the behaviour of the app. This application is not supported.")
            SecurityType.SystemCalls -> Pair("System calls detected", "It has the potential to inspect and manipulate the state of the app. This application is not supported.")
            SecurityType.Root -> Pair("Device is rooted", "This application is not supported on rooted device.")
            SecurityType.DeveloperOptions -> Pair("USB Debugger/developer Option is ON", "This application is not supported on USB debugging enabled device.")
            SecurityType.Emulator -> Pair("Emulator detected", "This application is not supported on emulator.")
            SecurityType.AppIntegrity -> Pair("App is not secure", "Please uninstall the application and install a secure version from the play store.")
            SecurityType.None -> Pair("No security issues detected", "This application is safe to use.")
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
        if (type == SecurityType.None) {
          callback("", "")
          return
        }

      val (title, message) = getTitleAndMessageForSecurityType(type)
      callback(title, message)
      launchSecurityActivity(activityContext, title, message)
    }

}
