from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)
# Enable CORS to allow your frontend to talk to this backend
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send-email', methods=['POST'])
def send_email():
    # 1. Get the data sent from script.js
    data = request.json
    name = data.get('user_name')
    email = data.get('user_email')
    phone = data.get('user_phone', 'N/A')
    message = data.get('message')

    # 2. Your Email Credentials
    sender_email = "moganjana711@gmail.com" 
    # Important: Do not use your normal Gmail password. 
    # Go to Google Account -> Security -> 2-Step Verification -> App Passwords to generate a 16-letter code.
    app_password = "hiaz eegy hxqf yikg" 

    # 3. Format the Email
    msg = MIMEText(f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}")
    msg['Subject'] = f"New Portfolio Message from {name}"
    msg['From'] = sender_email
    msg['To'] = sender_email # You are sending it to yourself

    # 4. Connect to Gmail and Send
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, app_password)
            server.send_message(msg)
        return jsonify({"status": "success", "message": "Email sent!"}), 200
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": "Failed to send email."}), 500

if __name__ == '__main__':
    # Runs the server locally on port 5000
    app.run(debug=True, port=5000)