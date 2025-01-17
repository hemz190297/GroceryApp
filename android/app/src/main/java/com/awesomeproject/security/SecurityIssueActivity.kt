package com.awesomeproject.security

import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.TextView
import androidx.activity.OnBackPressedCallback
import androidx.appcompat.app.AppCompatActivity
import com.awesomeproject.R
import kotlin.system.exitProcess

class SecurityIssueActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_security_issue)

        initializeViews()

        val onBackPressedCallback: OnBackPressedCallback = object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                closeApp()
            }
        }
        onBackPressedDispatcher.addCallback(this, onBackPressedCallback)
    }

    private fun initializeViews() {
        val extras = intent.extras
        if (extras != null) {
            val issueTitle = findViewById<TextView>(R.id.tv_issue_title)
            issueTitle.text = extras.getString(TITLE)
            val issueDescription = findViewById<TextView>(R.id.tv_issue_description)
            issueDescription.text = extras.getString(MESSAGE)
        }

        val closeAppButton = findViewById<Button>(R.id.btn_close_app)
        closeAppButton.setOnClickListener { view: View? ->
            closeApp()
        }
    }

    private fun closeApp() {
        finishAffinity()
        exitProcess(0)
    }

    companion object {
        // title in the form of HEX
        const val TITLE = "7469746c65"
        // message in the form of HEX
        const val MESSAGE = "6d657373616765"
    }

} // close app on back button press..

