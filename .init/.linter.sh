#!/bin/bash
cd /home/kavia/workspace/code-generation/restaurant-billing-and-invoicing-system-93616/restaurant_billing_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

