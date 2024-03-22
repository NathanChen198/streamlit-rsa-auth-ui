# Author    : Nathan Chen
# Date      : 23-Mar-2024


from typing import Optional, Literal, Union, Dict, List, Any


Object = Dict[str, Any]
FormType = Literal['default', 'inline']
HorizontalAlign = Literal['left', 'center', 'right']
TitleSize = Literal['smaller', 'small', 'medium', 'large', 'extraLarge']


class __Config:
    args: Optional[Object]

    def __init__(self,
            args: Optional[Object] = None) -> None:
        self.args = args

    def toDict(self) -> Object:
        return self.args if self.args is not None else {}

class TitleConfig(__Config):
    text: Optional[str]
    size: Optional[TitleSize]
    align: Optional[HorizontalAlign]

    def __init__(self,
            text: Optional[str] = None,
            size: Optional[TitleSize] = None,
            align: Optional[HorizontalAlign] = None,
            args: Optional[Object] = None):
        super().__init__(args)
        self.text = text
        self.size = size
        self.align = align

    def toDict(self) -> Dict[str, Any]:
        config = super().toDict()
        if self.text is not None: config['text'] = self.text
        if self.size is not None: config['size'] = self.size
        if self.align is not None: config['align'] = self.align
        return config

def _titleConfig(value: Union[str, TitleConfig, Object, None]) -> Optional[Object]:
    return \
        TitleConfig(value).toDict() if type(value) is str else \
        value.toDict() if isinstance(value, TitleConfig) else \
        value if type(value) is dict else \
        None
    
class __FormItemRule(__Config):
    message: Optional[str]
    warningOnly: Optional[bool]

    def __init__(self,
            message: Optional[str] = None,
            warningOnly: Optional[bool] = None,
            args: Optional[Object] = None) -> None:
        super().__init__(args)
        self.message = message
        self.warningOnly = warningOnly

    def toDict(self) -> Dict[str, Any]:
        config = super().toDict()
        if self.message is not None: config['message'] = self.message
        if self.warningOnly is not None: config['warningOnly'] = self.warningOnly
        return config

class RequiredRule(__FormItemRule):
    required: bool

    def __init__(self,
            required: bool = True,
            message: Optional[str] = None,
            warningOnly: Optional[bool] = None,
            args: Optional[Object] = None) -> None:
        super().__init__(message, warningOnly, args)
        self.required = required

    def toDict(self) -> Object:
        config = super().toDict()
        config['required'] = self.required
        return config

def _requiredRule(value: Union[bool, RequiredRule, Object, None]) -> Optional[Object]:
    return \
        RequiredRule(value).toDict() if type(value) is bool else \
        value.toDict() if isinstance(value, RequiredRule) else \
        value if type(value) is dict else \
        None

class PatternRule(__FormItemRule):
    pattern: str

    def __init__(self,
            pattern: str,
            message: Optional[str] = None,
            warningOnly: Optional[bool] = None,
            args: Optional[Object] = None) -> None:
        super().__init__(message, warningOnly, args)
        self.pattern = pattern

    def toDict(self) -> Object:
        config = super().toDict()
        config['pattern'] = self.pattern
        return config

def _patternRule(value: Union[str, PatternRule, Object]) -> Object:
    return \
        PatternRule(value).toDict() if type(value) is str else \
        value.toDict() if isinstance(value, PatternRule) else \
        value if type(value) is dict else \
        {}

class __ItemProps(__Config):
    label: Optional[str]
    width: Optional[str]

    def __init__(self,
            label: Optional[str] = None,
            width: Optional[str] = None,
            args: Optional[Object] = None) -> None:
        super().__init__(args)
        self.label = label
        self.width = width

    def toDict(self) -> Object:
        config = super().toDict()
        if self.label is not None: config['label'] = self.label
        if self.width is not None: config['width'] = self.width
        return config

class __FormItemProps(__ItemProps):
    required: Optional[Object]
    patterns: Optional[List[Object]]

    def __init__(self,
            label: Optional[str] = None,
            width: Optional[str] = None,
            required: Union[RequiredRule, bool, Object, None] = None,
            patterns: Optional[List[Union[PatternRule, str, Object]]] = None,
            args: Optional[Object] = None) -> None:
        super().__init__(label, width, args)
        self.required = _requiredRule(required)
        self.patterns = [_patternRule(pattern) for pattern in patterns] if patterns is not None else None

    def toDict(self) -> Object:
        config = super().toDict()
        if self.required is not None: config['required'] = self.required
        if self.patterns is not None: config['patterns'] = self.patterns
        return config

class __InputConfig(__FormItemProps):
    placeholder: Optional[str]
    
    def __init__(self,
            placeholder: Optional[str] = None,
            label: Optional[str] = None,
            width: Optional[str] = None,
            required: Union[RequiredRule, bool, Object, None] = None,
            patterns: Optional[List[Union[PatternRule, str, Object]]] = None,
            args: Optional[Object] = None) -> None:
        super().__init__(label, width, required, patterns, args)
        self.placeholder = placeholder

    def toDict(self) -> Object:
        config = super().toDict()
        if self.placeholder is not None: config['placeholder'] = self.placeholder
        return config

class TextInputConfig(__InputConfig):
    pass

def _textInputConfig(value: Union[str, TextInputConfig, Object, None]) -> Optional[Object]:
    return \
        TextInputConfig(value).toDict() if type(value) is str else \
        value.toDict() if isinstance(value, TextInputConfig) else \
        value if type(value) is dict else \
        None

class NumberInputConfig(__InputConfig):
    pass

class CheckboxConfig(__FormItemProps):
    pass

def _checkboxConfig(value: Union[str, CheckboxConfig, Object, None]) -> Optional[Object]:
    return \
        CheckboxConfig(value).toDict() if type(value) is str else \
        value.toDict() if isinstance(value, CheckboxConfig) else \
        value if type(value) is dict else \
        None

class ButtonConfig(__ItemProps):
    pass

def _buttonConfig(value: Union[str, ButtonConfig, Object, None]) -> Optional[Object]:
    return \
        ButtonConfig(value).toDict() if type(value) is str else \
        value.toDict() if isinstance(value, ButtonConfig) else \
        value if type(value) is dict else \
        None

class IconConfig(__Config):
    pass

def _iconConfig(value: Union[IconConfig, Object, None]) -> Optional[Object]:
    return \
        value.toDict() if isinstance(value, IconConfig) else \
        value if type(value) is dict else \
        None

class FormConfig(__Config):
    formType: Optional[FormType]
    labelSpan: Optional[int]
    wrapperSpan: Optional[int]
    maxWidth: Optional[int]
    align: Optional[HorizontalAlign]
    title: Optional[Object]
    cancel: Optional[Object]
    submit: Optional[Object]
    def __init__(self,
            formType: Optional[FormType] = None,
            labelSpan: Optional[int] = None,
            wrapperSpan: Optional[int] = None,
            maxWidth: Optional[int] = None,
            align: Optional[HorizontalAlign] = None,
            title: Union[str, TitleConfig, Object, None] = None,
            cancel: Union[IconConfig, Object, None] = None,
            submit: Union[str, ButtonConfig, Object, None] = None,
            args: Optional[Object] = None,) -> None:
        super().__init__(args)
        self.formType = formType
        self.labelSpan = labelSpan
        self.wrapperSpan = wrapperSpan
        self.maxWidth = maxWidth
        self.align = align
        self.title = _titleConfig(title)
        self.cancel = _iconConfig(cancel)
        self.submit = _buttonConfig(submit)

    def toDict(self) -> Dict[str, Any]:
        config = super().toDict()
        if self.formType is not None: config['type'] = self.formType
        if self.labelSpan is not None: config['labelSpan'] = self.labelSpan
        if self.wrapperSpan is not None: config['wrapperSpan'] = self.wrapperSpan
        if self.maxWidth is not None: config['maxWidth'] = self.maxWidth
        if self.align is not None: config['align'] = self.align
        if self.title is not None: config['title'] = self.title
        if self.cancel is not None: config['cancel'] = self.cancel
        if self.submit is not None: config['submit'] = self.submit
        return config

class SigninFormConfig(FormConfig):
    username: Optional[Object]
    password: Optional[Object]
    remember: Optional[Object]
    forgot: Optional[Object]

    def __init__(self,
            formType: Optional[FormType] = None,
            labelSpan: Optional[int] = None,
            wrapperSpan: Optional[int] = None,
            maxWidth: Optional[int] = None,
            align: Optional[HorizontalAlign] = None,
            title: Union[TitleConfig, str, Object, None] = None,
            cancel: Union[IconConfig, Object, None] = None,
            submit: Union[ButtonConfig, str, Object, None] = None,
            username: Union[TextInputConfig, str, Object, None] = None,
            password: Union[TextInputConfig, str, Object, None] = None,
            remember: Union[CheckboxConfig, str, Object, None] = None,
            forgot: Union[ButtonConfig, str, Object, None] = None,
            args: Optional[Object] = None,) -> None:
        super().__init__(formType, labelSpan, wrapperSpan, maxWidth, align, title, cancel, submit, args)
        self.username = _textInputConfig(username)
        self.password = _textInputConfig(password)
        self.remember = _checkboxConfig(remember)
        self.forgot = _buttonConfig(forgot)

    def toDict(self) -> Dict[str, Any]:
        config = super().toDict()
        if self.username is not None: config['username'] = self.username
        if self.password is not None: config['password'] = self.password
        if self.remember is not None: config['remember'] = self.remember
        if self.forgot is not None: config['forgot'] = self.forgot
        return config

class SignoutFormConfig(FormConfig):
    pass

class ChangePasswordFormConfig(FormConfig):
    current: Optional[Object]
    new: Optional[Object]
    confirm: Optional[Object]

    def __init__(self,
            formType: Optional[FormType] = None,
            labelSpan: Optional[int] = None,
            wrapperSpan: Optional[int] = None,
            maxWidth: Optional[int] = None,
            align: Optional[HorizontalAlign] = None,
            title: Union[TitleConfig, str, Object, None] = None,
            cancel: Union[IconConfig, Object, None] = None,
            submit: Union[ButtonConfig, str, Object, None] = None,
            current: Union[TextInputConfig, str, Object, None] = None,
            new: Union[TextInputConfig, str, Object, None] = None,
            confirm: Union[TextInputConfig, str, Object, None] = None,
            args: Optional[Object] = None,) -> None:
        super().__init__(formType, labelSpan, wrapperSpan, maxWidth, align, title, cancel, submit, args)
        self.current = _textInputConfig(current)
        self.new = _textInputConfig(new)
        self.confirm = _textInputConfig(confirm)

    def toDict(self) -> Dict[str, Any]:
        config = super().toDict()
        if self.current is not None: config['current'] = self.current
        if self.new is not None: config['new'] = self.new
        if self.confirm is not None: config['confirm'] = self.confirm
        return config
