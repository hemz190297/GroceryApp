package com.example.app.utils

import android.util.Base64

fun IntArray.decodeToString(): String {
  val base64String = this.map { it.toChar() }.joinToString("")
  return Base64.decode(base64String, Base64.DEFAULT).decodeToString()
}
