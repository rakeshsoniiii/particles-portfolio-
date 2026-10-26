import urllib.request

html = urllib.request.urlopen('http://localhost:3000/').read().decode('utf8')
print('my-work found in HTML:', 'id="my-work"' in html)
print('Beeskilled found in HTML:', 'Beeskilled' in html)
print('SkillNexis found in HTML:', 'SkillNexis' in html)
print('Favicon link found in HTML:', 'fevicon.jpeg' in html)
