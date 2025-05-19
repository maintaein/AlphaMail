package com.alphamail.common.util;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public class TimezoneHelper {

	public static LocalDateTime convertToUserTime(String timezoneOffset) {
		OffsetDateTime nowUtc = OffsetDateTime.now(ZoneOffset.UTC);

		ZoneOffset userOffset = ZoneOffset.of(timezoneOffset);

		OffsetDateTime userTime = nowUtc.withOffsetSameInstant(userOffset);

		return userTime.toLocalDateTime();
	}
}
