<div class="wsu-profile">

	<div class="wsu-profile__photo-container">
		<?php
		if ( $data['photo'] || $data['photo_srcset'] ) {
			?>
			<img class="wsu-profile__photo" src="<?php echo esc_attr( $data['photo'] ); ?>" srcset="<?php echo esc_attr( $data['photo_srcset'] ); ?>" alt=""/>
			<?php
		}
		?>
	</div>


	<div class="wsu-profile__details-container">
		<?php
		if ( ! empty( $data['titles'] ) ) {
			?>
			<ol class="wsu-profile__titles">
				<?php
				foreach ( $data['titles'] as $key => $t ) {
					echo '<li class="wsu-profile__title">' . esc_attr( $t ) . '</li>';
				}
				?>
			</ol>
			<?php
		}
		?>

		<?php
		if ( $data['email'] ) :
			?>
			<div class="wsu-profile__meta wsu-meta-email wsu-meta--icon-crimson">
				<span class="wsu-screen-reader-only">Email Address</span>
				<a href="mailto:<?php echo esc_attr( $data['email'] ); ?>"><?php echo esc_attr( $data['email'] ); ?></a>
			</div>
		<?php endif; ?>

		<?php
		if ( $data['office'] ) :
			?>
		<div class="wsu-profile__meta wsu-meta-location wsu-meta--icon-crimson">
			<span class="wsu-screen-reader-only">Location</span>
			<?php echo esc_attr( $data['office'] ); ?>
		</div>
		<?php endif; ?>

		<?php
		if ( $data['phone'] ) :
			?>
		<div class="wsu-profile__meta wsu-meta-phone wsu-meta--icon-crimson">
			<span class="wsu-screen-reader-only">Phone</span>
			<a href="tel:<?php echo esc_attr( $data['phone'] ); ?>"><?php echo esc_attr( $data['phone'] ); ?></a>
		</div>
		<?php endif; ?>

		<?php
		if ( $data['website'] ) :
			?>
		<div class="wsu-profile__meta wsu-meta-website wsu-meta--icon-crimson">
			<a href="<?php echo esc_attr( $data['website'] ); ?>">Website</a>
		</div>
		<?php endif; ?>
	</div>
</div>

<?php
if ( ! empty( $data['degrees'] ) ) :
	?>
<div class="wsu-profile__degrees">
	<h2 class="wsu-heading--style-marked">Education</h2>
	<ul>
		<?php
		foreach ( $data['degrees'] as $degree ) {
			echo '<li>' . esc_attr( $degree ) . '</li>';
		}
		?>
	</ul>
</div>
<?php endif; ?>

<?php
if ( ! empty( $data['bio'] ) ) :
	?>
<div class="wsu-profile__bio">
	<h2 class="wsu-heading--style-marked">Biography</h2>
	<?php echo $data['bio']; ?>
</div>
<?php endif; ?>
