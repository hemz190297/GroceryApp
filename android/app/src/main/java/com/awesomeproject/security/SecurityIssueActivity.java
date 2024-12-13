package com.awesomeproject.security;

import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;

import com.awesomeproject.R;

public class SecurityIssueActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_security_issue);

        initializeViews();

        OnBackPressedCallback onBackPressedCallback = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                closeApp();
            }
        };
        getOnBackPressedDispatcher().addCallback(onBackPressedCallback);
    }

    private void initializeViews() {
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            TextView issueTitle = findViewById(R.id.tv_issue_title);
            issueTitle.setText(extras.getString("title"));
            TextView issueDescription = findViewById(R.id.tv_issue_description);
            issueDescription.setText(extras.getString("message"));

        }

        Button closeAppButton = findViewById(R.id.btn_close_app);
        closeAppButton.setOnClickListener(view -> {
            closeApp();
        });

    }

    private void closeApp() {
        finishAffinity();
        System.exit(0);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

    }
}

// close app on back button press..