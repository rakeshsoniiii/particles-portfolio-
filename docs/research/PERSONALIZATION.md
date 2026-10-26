# Personalized project content

The seven projects use the exact user-specified order and destination links. Existing rightward scrolling and the source track's reversed DOM order are retained. Original video media nodes were replaced with local technical SVG cards; these are authored portfolio graphics, not screenshots or claims about the project interfaces. Unrelated interior-design videos are no longer referenced by the cards.

Sources consulted:
- Supplied RESUME.pdf: NLA Engine financial OSINT and CDR/IPDR telecom forensics descriptions.
- https://github.com/harpind3r/ip-changer : Bash script and Tor-based address rotation.
- https://github.com/harpind3r/Get-location : Flask browser-permission awareness demo.
- https://www.linkedin.com/posts/harpinder-singh-324886402_cybersecurity-ethicalhacking-activity-7514644215507800064-bFMb : Wi-Fi handshake and Evil Twin practice in a lab.
- https://www.linkedin.com/posts/harpinder-singh-324886402_cybersecurity-homelab-ethicalhacking-activity-7470407225866588160-0LO9 : isolated virtual ransomware lab with Metasploit.

The three onrender.com pages were unavailable to the web tool and timed out on a bounded HTTP fetch. GhostNet therefore has only a neutral cybersecurity-project subtitle, without invented capabilities. NLA/CDR use resume facts.

Run `node scripts/personalize-content.mjs` to regenerate project data/artwork and apply identity substitutions; `node scripts/check-personalization.mjs` verifies seven ordered entries, assets, homepage payloads and external links. The original four case-study pages are archived under docs/research/original-project-pages, and no longer served. Profile/resume navigation is in public/personal-links.js and responsive overrides in public/personal.css.
