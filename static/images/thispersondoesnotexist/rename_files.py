import os
[os.rename(f, f.replace(' (', '').replace(')', '')) for f in os.listdir('.') if not f.startswith('.')]
