port module Store exposing (..)

import Json.Encode
import Json.Decode

import Platform exposing (program)
import Html exposing (..)
import Html.Attributes exposing (style)
import String exposing (toUpper)

port nextState : Json.Encode.Value -> Cmd msg

main =
    Platform.program
        { init = init
        , update = update
        , subscriptions = subscriptions
        }

type alias Model =
    { value : Int
    , inputString: String
    }


initialState : Model
initialState = { value = 0
               , inputString = ""
               }

init : (Model, Cmd Msg)
init = (initialState, send initialState)

encodeState : Model -> Json.Encode.Value
encodeState model =
    Json.Encode.object
        [ ("value", Json.Encode.int <| model.value)
        , ("inputString", Json.Encode.string <| model.inputString)
        ]

type Msg
    = NoOp
    | Increment
    | Decrement
    | SetString String

send : Model -> Cmd Msg
send = nextState << encodeState

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        NoOp ->
            model ! []

        Increment ->
            let
                newModel = ({ model | value = model.value + 1})
            in
                (newModel, send newModel)

        Decrement ->
            let
                newModel = ({ model | value = max 0 (model.value - 1)})
            in
                (newModel, send newModel)

        SetString str ->
            let
                newModel = ({ model | inputString = toUpper str })
            in
                (newModel, send newModel)

port increment : (() -> msg) -> Sub msg
port decrement : (() -> msg) -> Sub msg
port setString : (String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch[ increment <| always Increment
             , decrement <| always Decrement
             , setString SetString
             ]
