package com.awesomeproject.security.utils

import android.content.Context
import android.os.Build
import android.provider.Settings
import com.example.app.utils.decodeToString

object DeveloperOptions {
    fun isDetected(context: Context): Boolean {
        // eng
        val eng = intArrayOf(90,87,53,110)
        println("mouliTesting - DeveloperOptions - eng: ${eng.decodeToString()}")
        return Settings.Global.getInt(
            context.contentResolver,
            Settings.Global.ADB_ENABLED,
            if (Build.TYPE == eng.decodeToString()) 1 else 0
        ) == 1;
    }
}
