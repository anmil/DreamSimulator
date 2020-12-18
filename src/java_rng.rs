use js_sys::Date;
use rand::{Error, RngCore};
use std::{cell::UnsafeCell, ops::Deref};

pub struct JavaRNGContainer {
	inner: UnsafeCell<JavaRNG>,
}

impl Deref for JavaRNGContainer {
	type Target = UnsafeCell<JavaRNG>;

	fn deref(&self) -> &Self::Target {
		&self.inner
	}
}

impl Default for JavaRNGContainer {
	fn default() -> Self {
		let seed = Date::new_0().get_utc_milliseconds() as u64;
		Self {
			inner: UnsafeCell::new(JavaRNG { seed }),
		}
	}
}

unsafe impl Sync for JavaRNGContainer {}
unsafe impl Send for JavaRNGContainer {}

pub struct JavaRNG {
	seed: u64,
}

impl RngCore for JavaRNG {
	fn next_u32(&mut self) -> u32 {
		self.seed = ((self.seed) * 0x5DEECE66D_u64 + 0xB_u64) & ((1_u64 << 48) - 1);
		(self.seed >> 16) as u32
	}

	fn next_u64(&mut self) -> u64 {
		self.next_u32() as u64
	}

	fn fill_bytes(&mut self, _dest: &mut [u8]) {
		unimplemented!()
	}

	fn try_fill_bytes(&mut self, _dest: &mut [u8]) -> Result<(), Error> {
		unimplemented!()
	}
}
