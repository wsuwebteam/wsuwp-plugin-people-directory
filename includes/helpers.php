<?php namespace WSUWP\Plugin\People_Directory;

class Helpers {

	public static function serialize_block_template( $block ) {

		$block_content = '';

		if ( isset( $block[2] ) ) {
			$index = 0;
			foreach ( $block[2] as $chunk ) {
				$block_content .= is_string( $chunk ) ? $chunk : serialize_block_template( $block[2][ $index++ ] );
			}
		}

		return get_comment_delimited_block_content(
			$block[0],
			$block[1],
			$block_content
		);

	}

}
