def scaled_percent(
    value: float,
    size: int,
    scaled_min: float,
    scaled_max: float,
) -> float:
    """Helper to publish scaled percent on publisher with celery :param value:
    value to publish :param scaled_min: minimum scaled range :param scaled_max:
    maximum scaled range :param size: size of scaled percent."""
    return scaled_min + (scaled_max - scaled_min) * (value / float(size))
