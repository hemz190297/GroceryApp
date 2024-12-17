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
import com.example.app.utils.SECURITY_LOG_TAG
import com.example.app.utils.decodeToString


enum class SecurityType {
    Frida,
    SystemCalls,
    Root,
    DeveloperOptions,
    Emulator,
    AppIntegrity,
    None
}

object Obfuscation {
    object Frida {
        // Frida server detected
        val title = intArrayOf(82,110,74,112,90,71,69,103,99,50,86,121,100,109,86,121,73,71,82,108,100,71,86,106,100,71,86,107)
        // It has the potential to dynamically analyze and manipulate the behaviour of the app. This application is not supported.
        val message = intArrayOf(83,88,81,103,97,71,70,122,73,72,82,111,90,83,66,119,98,51,82,108,98,110,82,112,89,87,119,103,100,71,56,103,90,72,108,117,89,87,49,112,89,50,70,115,98,72,107,103,89,87,53,104,98,72,108,54,90,83,66,104,98,109,81,103,98,87,70,117,97,88,66,49,98,71,70,48,90,83,66,48,97,71,85,103,89,109,86,111,89,88,90,112,98,51,86,121,73,71,57,109,73,72,82,111,90,83,66,104,99,72,65,117,73,70,82,111,97,88,77,103,89,88,66,119,98,71,108,106,89,88,82,112,98,50,52,103,97,88,77,103,98,109,57,48,73,72,78,49,99,72,66,118,99,110,82,108,90,67,52,61)
    }
    object SystemCalls {
        // System calls detected
        val title = intArrayOf(85,51,108,122,100,71,86,116,73,71,78,104,98,71,120,122,73,71,82,108,100,71,86,106,100,71,86,107)
        // It has the potential to inspect and manipulate the state of the app. This application is not supported.
        val message = intArrayOf(83,88,81,103,97,71,70,122,73,72,82,111,90,83,66,119,98,51,82,108,98,110,82,112,89,87,119,103,100,71,56,103,97,87,53,122,99,71,86,106,100,67,66,104,98,109,81,103,98,87,70,117,97,88,66,49,98,71,70,48,90,83,66,48,97,71,85,103,99,51,82,104,100,71,85,103,98,50,89,103,100,71,104,108,73,71,70,119,99,67,52,103,86,71,104,112,99,121,66,104,99,72,66,115,97,87,78,104,100,71,108,118,98,105,66,112,99,121,66,117,98,51,81,103,99,51,86,119,99,71,57,121,100,71,86,107,76,103,61,61)
    }
    object Root {
        // Device is rooted
        val title = intArrayOf(82,71,86,50,97,87,78,108,73,71,108,122,73,72,74,118,98,51,82,108,90,65,61,61)
        // This application is not supported on rooted device.
        val message = intArrayOf(86,71,104,112,99,121,66,104,99,72,66,115,97,87,78,104,100,71,108,118,98,105,66,112,99,121,66,117,98,51,81,103,99,51,86,119,99,71,57,121,100,71,86,107,73,71,57,117,73,72,74,118,98,51,82,108,90,67,66,107,90,88,90,112,89,50,85,117)
    }
    object DeveloperOptions {
        // USB Debugger/developer Option is ON
        val title = intArrayOf(86,86,78,67,73,69,82,108,89,110,86,110,90,50,86,121,76,50,82,108,100,109,86,115,98,51,66,108,99,105,66,80,99,72,82,112,98,50,52,103,97,88,77,103,84,48,52,61)
        // This application is not supported on USB debugging enabled device.
        val message = intArrayOf(86,71,104,112,99,121,66,104,99,72,66,115,97,87,78,104,100,71,108,118,98,105,66,112,99,121,66,117,98,51,81,103,99,51,86,119,99,71,57,121,100,71,86,107,73,71,57,117,73,70,86,84,81,105,66,107,90,87,74,49,90,50,100,112,98,109,99,103,90,87,53,104,89,109,120,108,90,67,66,107,90,88,90,112,89,50,85,117)
    }
    object Emulator {
        // Emulator detected
        val title = intArrayOf(82,87,49,49,98,71,70,48,98,51,73,103,90,71,86,48,90,87,78,48,90,87,81,61)
        // This application is not supported on emulator.
        val message = intArrayOf(86,71,104,112,99,121,66,104,99,72,66,115,97,87,78,104,100,71,108,118,98,105,66,112,99,121,66,117,98,51,81,103,99,51,86,119,99,71,57,121,100,71,86,107,73,71,57,117,73,71,86,116,100,87,120,104,100,71,57,121,76,103,61,61)
    }
    object AppIntegrity {
        // App is not secure
        val title = intArrayOf(81,88,66,119,73,71,108,122,73,71,53,118,100,67,66,122,90,87,78,49,99,109,85,61)
        // Please uninstall the application and install a secure version from the play store.
        val message = intArrayOf(85,71,120,108,89,88,78,108,73,72,86,117,97,87,53,122,100,71,70,115,98,67,66,48,97,71,85,103,89,88,66,119,98,71,108,106,89,88,82,112,98,50,52,103,89,87,53,107,73,71,108,117,99,51,82,104,98,71,119,103,89,83,66,122,90,87,78,49,99,109,85,103,100,109,86,121,99,50,108,118,98,105,66,109,99,109,57,116,73,72,82,111,90,83,66,119,98,71,70,53,73,72,78,48,98,51,74,108,76,103,61,61)
    }
    object None {
        // No security issues detected
        val title = intArrayOf(84,109,56,103,99,50,86,106,100,88,74,112,100,72,107,103,97,88,78,122,100,87,86,122,73,71,82,108,100,71,86,106,100,71,86,107)
        // This application is safe to use.
        val message = intArrayOf(86,71,104,112,99,121,66,104,99,72,66,115,97,87,78,104,100,71,108,118,98,105,66,112,99,121,66,122,89,87,90,108,73,72,82,118,73,72,86,122,90,83,52,61)
    }
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
        println("${SECURITY_LOG_TAG.decodeToString()} - getTitleAndMessageForSecurityType \n" +
                "Frida - ${Obfuscation.Frida.title.decodeToString()}, ${Obfuscation.Frida.message.decodeToString()}\n" +
                "SystemCalls - ${Obfuscation.SystemCalls.title.decodeToString()}, ${Obfuscation.SystemCalls.message.decodeToString()}\n" +
                "Root - ${Obfuscation.Root.title.decodeToString()}, ${Obfuscation.Root.message.decodeToString()}\n" +
                "DeveloperOptions - ${Obfuscation.DeveloperOptions.title.decodeToString()}, ${Obfuscation.DeveloperOptions.message.decodeToString()}\n" +
                "Emulator - ${Obfuscation.Emulator.title.decodeToString()}, ${Obfuscation.Emulator.message.decodeToString()}\n" +
                "AppIntegrity - ${Obfuscation.AppIntegrity.title.decodeToString()}, ${Obfuscation.AppIntegrity.message.decodeToString()}\n" +
                "None - ${Obfuscation.None.title.decodeToString()}, ${Obfuscation.None.message.decodeToString()}")
        return when (type) {
            SecurityType.Frida -> Pair(Obfuscation.Frida.title.decodeToString(), Obfuscation.Frida.message.decodeToString())
            SecurityType.SystemCalls -> Pair(Obfuscation.SystemCalls.title.decodeToString(), Obfuscation.SystemCalls.message.decodeToString())
            SecurityType.Root -> Pair(Obfuscation.Root.title.decodeToString(), Obfuscation.Root.message.decodeToString())
            SecurityType.DeveloperOptions -> Pair(Obfuscation.DeveloperOptions.title.decodeToString(), Obfuscation.DeveloperOptions.message.decodeToString())
            SecurityType.Emulator -> Pair(Obfuscation.Emulator.title.decodeToString(), Obfuscation.Emulator.message.decodeToString())
            SecurityType.AppIntegrity -> Pair(Obfuscation.AppIntegrity.title.decodeToString(), Obfuscation.AppIntegrity.message.decodeToString())
            SecurityType.None -> Pair(Obfuscation.None.title.decodeToString(), Obfuscation.None.message.decodeToString())
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
