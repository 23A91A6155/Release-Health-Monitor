# Verification Guide

## Overview
This directory contains placeholders for verification screenshots that demonstrate the Release Health Monitor's Sentry integration.

## Required Screenshots

### 1. release-v1.0.0-errors.png
**Purpose**: Show unhandled errors captured in Sentry under release v1.0.0
**Steps**:
1. Set SENTRY_RELEASE=release-health-monitor@1.0.0
2. Start the application
3. Click 'Trigger Unhandled Exception' button
4. Visit: curl http://localhost:3001/api/error/unhandled
5. Go to Sentry Dashboard > Issues
6. Filter by release: release-health-monitor@1.0.0
7. Take screenshot showing the errors

### 2. release-v1.1.0-error.png
**Purpose**: Show handled error captured in Sentry under release v1.1.0
**Steps**:
1. Set SENTRY_RELEASE=release-health-monitor@1.1.0
2. Restart the application
3. Click 'Trigger Handled Error' button
4. Go to Sentry Dashboard > Issues
5. Filter by release: release-health-monitor@1.1.0
6. Take screenshot showing the handled error

### 3. sourcemap-proof.png
**Purpose**: Show that source maps are working (readable source code in Sentry)
**Steps**:
1. Run npm run release:v1.0.0 to upload source maps
2. Trigger an error
3. Open the error in Sentry
4. Navigate to the stack trace
5. Take screenshot showing readable TypeScript source (not minified JS)

### 4. release-health-enabled.png
**Purpose**: Show Release Health dashboard is active in Sentry
**Steps**:
1. Go to Sentry > Releases
2. Take screenshot showing the releases with health data

### 5. release-health-comparison.png
**Purpose**: Compare crash-free session rates between releases
**Steps**:
1. After running v1.1.0 with errors and v1.1.1 with healthy sessions
2. Go to Sentry > Releases
3. Take screenshot comparing crash-free rates

### 6. alert-rule-config.png
**Purpose**: Show configured alert rule in Sentry
**Steps**:
1. Go to Sentry > Alerts > Create Rule
2. Configure: Errors > 5 in 1 hour
3. Take screenshot of the configuration

### 7. alert-triggered.png
**Purpose**: Show an alert was triggered
**Steps**:
1. After triggering enough errors to fire the alert
2. Go to Sentry > Alerts
3. Take screenshot showing the triggered alert
