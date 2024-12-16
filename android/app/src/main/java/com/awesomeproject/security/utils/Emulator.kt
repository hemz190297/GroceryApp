package com.awesomeproject.security.utils

import android.content.Context
import android.os.Build
import android.telephony.TelephonyManager
import java.io.File


private object Files {
  private val GENY_FILES = arrayOf(
    "/dev/socket/genyd",
    "/dev/socket/baseband_genyd"
  )
  private val PIPES = arrayOf(
    "/dev/socket/qemud",
    "/dev/qemu_pipe"
  )
  private val X86_FILES = arrayOf(
    "ueventd.android_x86.rc",
    "x86.prop",
    "ueventd.ttVM_x86.rc",
    "init.ttVM_x86.rc",
    "fstab.ttVM_x86",
    "fstab.vbox86",
    "init.vbox86.rc",
    "ueventd.vbox86.rc"
  )
  private val ANDY_FILES = arrayOf(
    "fstab.andy",
    "ueventd.andy.rc"
  )
  private val NOX_FILES = arrayOf(
    "fstab.nox",
    "init.nox.rc",
    "ueventd.nox.rc"
  )
  fun checkFiles(targets: Array<String>): Boolean {
    try {
      for (pipe in targets) {
        val file = File(pipe)
        if (file.exists()) {
          return true
        }
      }
    } catch (_: Exception){}
    return false
  }
  fun checkEmulatorFiles():Boolean {
    return (checkFiles(GENY_FILES)
      || checkFiles(ANDY_FILES)
      || checkFiles(NOX_FILES)
      || checkFiles(X86_FILES)
      || checkFiles(PIPES))
  }
}

private object NetworkOperator {
  fun detect(context: Context): Boolean {
    try {
        val tm = context.getSystemService(Context.TELEPHONY_SERVICE) as TelephonyManager?
        val networkOperator = tm!!.networkOperatorName
        return "android" == networkOperator.lowercase()
    } catch (_: Exception) {}
    return false
  }
}

private object Firebase {
  fun detect(): Boolean {
//    return FirebaseCrashlytics.getInstance().isEmulator()
    return false
  }
}


object Emulator {

  fun isDetected(context: Context): Boolean {
    return checkViaBuild() || Files.checkEmulatorFiles() || NetworkOperator.detect(context) || Firebase.detect()
  }

  private fun checkViaBuild(): Boolean {
    return (Build.MANUFACTURER.lowercase().contains("genymotion")
      || Build.MANUFACTURER.lowercase().contains("unknown")
      || Build.MODEL.lowercase().contains("google_sdk")
      || Build.MODEL.lowercase().contains("droid4x")
      || Build.MODEL.lowercase().contains("emulator")
      || Build.MODEL.contains("Android SDK built for x86")
      || Build.HARDWARE == "goldfish"
      || Build.HARDWARE == "ranchu"
      || Build.HARDWARE == "vbox86"
      || Build.HARDWARE.lowercase().contains("nox")
      || Build.FINGERPRINT.contains("generic")
      || Build.PRODUCT == "sdk"
      || Build.PRODUCT == "google_sdk"
      || Build.PRODUCT == "sdk_x86"
      || Build.PRODUCT == "vbox86p"
      || Build.PRODUCT.lowercase().contains("nox")
      || Build.BOARD.lowercase().contains("nox")
      || (Build.BRAND.lowercase().contains("generic") && Build.DEVICE.lowercase().contains("generic")))
  }
}
