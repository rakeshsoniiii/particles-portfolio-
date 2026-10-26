"""
Generate high-fidelity cybersecurity UI card images for:
- get-location (Browser Geolocation Awareness & Permission Testing)
- wireless-security-lab (Wi-Fi Handshake & Evil Twin Lab)
- ransomware-homelab (Isolated Virtual Lab & Ransomware Analysis)
"""
from PIL import Image, ImageDraw, ImageFont
import math

def create_card(title, subtitle, badge, accent_color, mode):
    w, h = 1280, 720
    im = Image.new('RGB', (w, h), (18, 20, 26))
    d = ImageDraw.Draw(im)

    # Subtle grid background
    for x in range(0, w, 40):
        d.line([(x, 0), (x, h)], fill=(26, 30, 40), width=1)
    for y in range(0, h, 40):
        d.line([(0, y), (w, y)], fill=(26, 30, 40), width=1)

    # Top nav bar
    d.rectangle([(0, 0), (w, 55)], fill=(23, 26, 34))
    d.line([(0, 55), (w, 55)], fill=(45, 52, 68), width=1)
    
    # Title & Badge
    d.text((40, 18), title.upper(), fill=accent_color)
    d.text((360, 18), "|  " + subtitle, fill=(160, 172, 190))
    d.rectangle([(w - 180, 14), (w - 40, 42)], outline=accent_color, width=1)
    d.text((w - 165, 18), badge, fill=accent_color)

    if mode == 'geo':
        # Left panel: permission awareness
        d.rectangle([(40, 80), (480, 660)], fill=(23, 26, 35), outline=(45, 52, 68))
        d.text((65, 105), "BROWSER PERMISSION AUDIT", fill=accent_color)
        d.line([(65, 135), (455, 135)], fill=(38, 44, 58))
        
        items = [
            ("Navigator Geolocation API", "INTERCEPTED", (255, 180, 70)),
            ("High Accuracy Mode", "ENABLED", (80, 220, 160)),
            ("Client User-Agent", "Mozilla/5.0 (X11)", (180, 190, 205)),
            ("WebRTC Local IP Leak", "DETECTED (192.168.1.4)", (255, 90, 90)),
            ("Permission Prompt State", "GRANTED (Session)", (80, 220, 160)),
            ("Latitude / Longitude Precision", "18.5204° N, 73.8567° E", (100, 200, 255)),
            ("Estimated Accuracy Radius", "±12 meters", (180, 190, 205)),
            ("Reverse Geocoded Address", "Maharashtra, India", (255, 255, 255))
        ]
        for i, (k, v, col) in enumerate(items):
            y_pos = 160 + i * 58
            d.text((65, y_pos), k, fill=(140, 150, 170))
            d.text((65, y_pos + 22), v, fill=col)

        # Right panel: Radar & Triangulation
        d.rectangle([(510, 80), (1240, 660)], fill=(21, 24, 32), outline=(45, 52, 68))
        cx, cy = 875, 370
        for r in [60, 120, 180, 240]:
            d.ellipse([(cx - r, cy - r), (cx + r, cy + r)], outline=(35, 60, 85), width=1)
        d.line([(cx - 250, cy), (cx + 250, cy)], fill=(35, 60, 85), width=1)
        d.line([(cx, cy - 250), (cx, cy + 250)], fill=(35, 60, 85), width=1)
        
        # Radar sweep angle
        d.arc([(cx - 240, cy - 240), (cx + 240, cy + 240)], start=210, end=330, fill=accent_color, width=2)
        d.line([(cx, cy), (cx + 208, cy - 120)], fill=accent_color, width=2)

        # Target blips
        d.ellipse([(cx + 90, cy - 80), (cx + 104, cy - 66)], fill=(255, 80, 80))
        d.text((cx + 115, cy - 85), "TARGET ACCURACY: ±12m", fill=(255, 120, 120))
        d.ellipse([(cx - 120, cy + 110), (cx - 110, cy + 120)], fill=accent_color)
        d.text((cx - 100, cy + 110), "BASE STATION IPDR", fill=accent_color)

    elif mode == 'wifi':
        # Wireless security lab
        d.rectangle([(40, 80), (520, 660)], fill=(23, 26, 35), outline=(45, 52, 68))
        d.text((65, 105), "802.11 PACKET CAPTURE & EVIL TWIN", fill=accent_color)
        d.line([(65, 135), (495, 135)], fill=(38, 44, 58))

        wifi_items = [
            ("Wireless Interface", "wlan0mon (Monitor Mode)", (80, 220, 160)),
            ("Target BSSID", "F4:8E:38:A2:9B:C1", (255, 200, 100)),
            ("Target SSID", "Corp_Secure_5G", (255, 255, 255)),
            ("Channel / Frequency", "CH 6 (2.437 GHz) / CH 36", (180, 190, 205)),
            ("Deauthentication Frames", "48 packets injected", (255, 100, 100)),
            ("WPA2 4-Way Handshake", "CAPTURED [EAPOL Msg 1-4]", (80, 220, 160)),
            ("Rogue AP (Evil Twin)", "BROADCASTING (Captive Portal)", (255, 120, 80)),
            ("Credential Harvesting", "SSLstrip Active · HTTPS Bypass", (255, 180, 70))
        ]
        for i, (k, v, col) in enumerate(wifi_items):
            y_pos = 160 + i * 58
            d.text((65, y_pos), k, fill=(140, 150, 170))
            d.text((65, y_pos + 22), v, fill=col)

        # Right panel: Signal Spectrogram & Spectrum
        d.rectangle([(550, 80), (1240, 660)], fill=(21, 24, 32), outline=(45, 52, 68))
        d.text((580, 105), "RF SIGNAL SPECTRUM & CHANNELS", fill=(160, 175, 200))
        
        # Draw spectrum channels
        for ch, (cx, h_sig, color) in enumerate([
            (700, 280, (50, 180, 255)),
            (850, 420, accent_color),
            (1020, 210, (255, 100, 100)),
            (1140, 310, (180, 100, 255))
        ]):
            points = []
            for dx in range(-90, 91, 5):
                curve = math.cos(dx / 90 * math.pi / 2) ** 2
                points.append((cx + dx, 580 - curve * h_sig))
            d.line(points, fill=color, width=2)
            d.text((cx - 20, 600), f"CH {ch*5 + 1}", fill=(120, 135, 160))

        d.text((790, 150), "TARGET AP (EVIL TWIN OVERLAY)", fill=accent_color)
        d.line([(850, 175), (850, 240)], fill=accent_color, width=2)

    elif mode == 'ransom':
        # Ransomware Home Lab
        d.rectangle([(40, 80), (600, 660)], fill=(23, 26, 35), outline=(45, 52, 68))
        d.text((65, 105), "ISOLATED MALWARE ANALYSIS SANDBOX", fill=accent_color)
        d.line([(65, 135), (575, 135)], fill=(38, 44, 58))

        lab_items = [
            ("Lab Environment", "Isolated Host-Only Virtual Switch", (80, 220, 160)),
            ("Victim OS", "Windows 10 Enterprise (Build 19045)", (180, 190, 205)),
            ("Attacker Machine", "Kali Linux (Metasploit Framework)", (255, 100, 100)),
            ("Payload Type", "AES-256 File Encryptor Simulator", (255, 180, 70)),
            ("Shadow Copy Deletion", "vssadmin delete shadows /all", (255, 90, 90)),
            ("Sysmon Event Log", "Event ID 1 (Process Create) Logged", (80, 220, 160)),
            ("Detection Rule", "Sigma / YARA Rule Verified", (100, 200, 255)),
            ("Recovery Strategy", "Offline Volume Snapshot Restored", (80, 220, 160))
        ]
        for i, (k, v, col) in enumerate(lab_items):
            y_pos = 160 + i * 58
            d.text((65, y_pos), k, fill=(140, 150, 170))
            d.text((65, y_pos + 22), v, fill=col)

        # Right panel: Attack Warning Screen
        d.rectangle([(630, 80), (1240, 660)], fill=(32, 20, 24), outline=(180, 50, 60), width=2)
        d.text((720, 160), "[!] SECURITY ALERT - RANSOMWARE EXECUTED", fill=(255, 70, 80))
        d.text((680, 220), "ALL FILES HAVE BEEN ENCRYPTED (LAB SIMULATION)", fill=(255, 255, 255))
        d.rectangle([(680, 280), (1190, 500)], fill=(20, 14, 18), outline=(90, 30, 40))
        
        console_lines = [
            "> Initializing Metasploit multi/handler...",
            "> Meterpreter session 1 opened (192.168.56.101:4444)",
            "> Enumerating user directory and document stores...",
            "> Encrypting files: .docx, .xlsx, .pdf, .db (AES-256-CBC)",
            "> Ransom note dropped: RESTORE_FILES.txt",
            "> Disabling Windows Defender Real-time Protection...",
            "> SIEM Alert Triggered: High-velocity disk I/O anomaly!"
        ]
        for idx, line in enumerate(console_lines):
            col = (255, 100, 100) if "Encrypting" in line or "SIEM" in line else (180, 185, 195)
            d.text((700, 305 + idx * 26), line, fill=col)

        d.rectangle([(780, 540), (1090, 595)], fill=(160, 35, 45))
        d.text((820, 558), "ANALYSIS IN PROGRESS", fill=(255, 255, 255))

    return im

card5 = create_card("Get Location", "Browser Permission Testing & Geolocation Awareness", "AWARENESS LAB", (255, 90, 120), 'geo')
card5.save('public/assets/projects/get-location.jpg', quality=95)

card6 = create_card("Wireless Security Lab", "Wi-Fi Handshake & Evil Twin Attack Analysis", "WIRELESS LAB", (50, 205, 255), 'wifi')
card6.save('public/assets/projects/wireless-security-lab.jpg', quality=95)

card7 = create_card("Ransomware Home Lab", "Isolated Virtual Lab · Malware Simulation", "MALWARE LAB", (255, 80, 80), 'ransom')
card7.save('public/assets/projects/ransomware-homelab.jpg', quality=95)

print("Created get-location.jpg, wireless-security-lab.jpg, ransomware-homelab.jpg successfully!")
