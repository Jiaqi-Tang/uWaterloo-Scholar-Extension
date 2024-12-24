import logging
import sys
import errorhandler


# Configure logging
logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)

error_handler = errorhandler.ErrorHandler()
stream_handler = logging.StreamHandler(stream=sys.stderr)

logger = logging.getLogger()
logger.addHandler(stream_handler)

def safe_exit_if_error_occurred(msg):
    if error_handler.fired:
        sys.exit(msg)