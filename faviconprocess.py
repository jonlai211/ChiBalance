from cairosvg import svg2png

# SVG content provided by user
svg_data = '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
  <!-- Background Circle -->
  <circle cx="50" cy="50" r="50" fill="black"/>

  <!-- White Semi-Circle -->
  <path d="M 50 0 A 50 50 0 0 1 50 100 A 25 25 0 0 0 50 0" fill="white"/>

  <!-- Small Black Circle in White Section -->
  <circle cx="50" cy="25" r="12.5" fill="black"/>

  <!-- Small White Circle in Black Section -->
  <circle cx="50" cy="75" r="12.5" fill="white"/>
</svg>
'''

# Saving the SVG as a PNG file
output_file_path = './favicon.png'
svg2png(bytestring=svg_data, write_to=output_file_path)

output_file_path