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
    event: EventInfo = 'cancelSignin'

    def __init__(self) -> None:
        super().__init__('cancelSignin')

class SignoutEvent(Event):
    event: EventInfo = 'signout'

    def __init__(self) -> None:
        super().__init__('signout')

class CancelSignoutEvent(Event):
    event: EventInfo = 'cancelSignout'

    def __init__(self) -> None:
        super().__init__('cancelSignout')


def getEvent(value):
    if type(value) is not dict: return None
    info: EventInfo = value.get('event', None)
    if info == SigninEvent.event:
        event = SigninEvent()
        event.__dict__ = value
    elif info == CancelSigninEvent.event:
        event = CancelSignoutEvent()
    elif info == SignoutEvent.event:
        event = SignoutEvent()
    elif info == CancelSignoutEvent.event:
        event = CancelSignoutEvent()
    else:
        event = None

    return event