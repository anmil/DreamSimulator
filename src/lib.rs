mod java_rng;

use java_rng::JavaRNGContainer;
use once_cell::sync::Lazy;
use rand_distr::{Binomial, Distribution};
use wasm_bindgen::prelude::*;

pub static PEARL_JAVA_RNG: Lazy<JavaRNGContainer> = Lazy::new(JavaRNGContainer::default);
pub static PEARL_BINOMIAL: Lazy<Binomial> = Lazy::new(|| Binomial::new(262, 20.0 / 423.0).unwrap());

pub static BLAZE_ROD_JAVA_RNG: Lazy<JavaRNGContainer> = Lazy::new(JavaRNGContainer::default);
pub static BLAZE_ROD_BINOMIAL: Lazy<Binomial> = Lazy::new(|| Binomial::new(305, 0.5).unwrap());

#[wasm_bindgen(start)]
pub fn wasm_main() {
	console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn simulate_stream() -> Vec<u32> {
	let pearls = Binomial::new(262, 20.0 / 423.0)
		.unwrap()
		.sample(unsafe { &mut (*PEARL_JAVA_RNG.get()) });
	let rods = Binomial::new(305, 0.5)
		.unwrap()
		.sample(unsafe { &mut (*BLAZE_ROD_JAVA_RNG.get()) });

	vec![pearls as u32, rods as u32]
}

#[wasm_bindgen]
pub fn reseed() {
	unsafe { &mut (*PEARL_JAVA_RNG.get()) }.reseed();
	unsafe { &mut (*BLAZE_ROD_JAVA_RNG.get()) }.reseed();
}
