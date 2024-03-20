# Author    : Nathan Chen
# Date      : 20-Mar-2024


from typing import Literal


EventInfo = Literal['signin', 'cancelSignin', 'signout', 'cancelSignout', 'changePassword', 'cancelChangePassword']


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

class ChangePasswordEvent(Event):
    event: EventInfo = 'changePassword'

    def __init__(self) -> None:
        super().__init__('changePassword')

class CancelChangePasswordEvent(Event):
    event: EventInfo = 'cancelChangePassword'
    current: str
    new: str

    def __init__(self) -> None:
        super().__init__('cancelChangePassword')


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
    elif info == ChangePasswordEvent.event:
        event = ChangePasswordEvent()
        event.__dict__ = value
    elif info == CancelChangePasswordEvent.event:
        event = CancelChangePasswordEvent()
    else:
        event = None

    return event