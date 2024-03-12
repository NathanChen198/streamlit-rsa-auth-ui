# Author    : Nathan Chen
# Date      : 11-Mar-2024


from typing import Literal


EventInfo = Literal['signin', 'cancelSignin', 'signout', 'cancelSignout']


class Event:
    event: EventInfo

    def __init__(self, event: EventInfo) -> None:
        self.event = event


class SigninEvent(Event):
    event: EventInfo = 'signin'
    username: str
    password: str
    remember: bool

    def __init__(self) -> None:
        super().__init__('signin')

class CancelSigninEvent(Event):
    def __init__(self) -> None:
        super().__init__('cancelSignin')

class SignoutEvent(Event):
    def __init__(self) -> None:
        super().__init__('signout')

class CancelSignoutEvent(Event):
    def __init__(self) -> None:
        super().__init__('cancelSignout')


def getEvent(value):
    if type(value) is not dict: return None
    info: EventInfo = value['event']
    event = None
    if info == 'signin':
        event = SigninEvent()
        event.__dict__ = value
    elif info == 'cancelSignin':
        event = CancelSignoutEvent()
    elif info == 'signout':
        event = SignoutEvent()
    elif info == 'cancelSignout':
        event = CancelSignoutEvent()

    return event