package com.awesomeproject.security.utils

import android.content.Context
import android.os.Build
import android.provider.Settings

object DeveloperOptions {
    fun isDetected(context: Context): Boolean {
        return Settings.Global.getInt(
            context.contentResolver,
            Settings.Global.ADB_ENABLED,
            if (Build.TYPE == "eng") 1 else 0
        ) == 1;
    }
}
