package com.awesomeproject.security.utils

import android.content.Context
import com.awesomeproject.security.utils.hash.Manifest

object AppIntegrity {

  fun isValid(context: Context): Boolean {
    return Manifest.isValid(context)
  }
}
