<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Hash Change</title>

	<link rel="stylesheet" href="../../../../node_modules/@splidejs/splide/dist/css/themes/splide-default.min.css">
	<script type="text/javascript" src="../../../../node_modules/@splidejs/splide/dist/js/splide.js"></script>
	<script type="text/javascript" src="../../../../dist/js/splide-extension-url-hash.js"></script>

	<script>
		document.addEventListener( 'DOMContentLoaded', function () {
			var splide = new Splide( '#splide01', {
				width  : 600,
				height : 300,
				gap    : '1rem',
			} );

			splide.mount( window.splide.Extensions );
		} );
	</script>

	<style>
		.splide__slide {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 4rem;
		}
	</style>
</head>
<body>

<div id="splide01" class="splide">
	<div class="splide__track">
		<ul class="splide__list">
			<?php
			for ( $i = 0; $i < 10; $i ++ ) {
				printf( '<li class="splide__slide" data-splide-hash="%s">', $i + 1 );
				echo $i + 1;
				echo '</li>' . PHP_EOL;
			}
			echo '</ul>';
			?>
		</ul>
	</div>
</div>

</body>
</html>
