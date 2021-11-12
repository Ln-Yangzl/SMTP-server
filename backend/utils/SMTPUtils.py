class SMTPServerError(Exception):
    def __init__(self, value) -> None:
        self.value = value

    def getMessage(self) -> str:
        return self.value

    def __str__(self) -> str:
        return repr(self.value)