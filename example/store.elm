port module Store exposing (..)

import Realm exposing (updateState)

import Platform exposing (programWithFlags)
import String exposing (toUpper)
import Json.Decode

port nextState : Model -> Cmd msg

main : Program (Maybe Model) Model Msg
main =
    Platform.programWithFlags
        { init = init
        , update = updateState update nextState
        , subscriptions = subscriptions
        }

init : Maybe Model -> (Model, Cmd msg)
init flags = Maybe.withDefault emptyModel flags ! []

type alias Model =
    { value : Int
    , inputString : String
    , user : Maybe User
    }


emptyModel : Model
emptyModel = { value = 0
             , inputString = ""
             , user = Nothing
             }

type alias User
    = { username : String
      , age : Int
      }

type Msg
    = NoOp
    | Increment
    | Decrement
    | SetString String
    | SetUser (Maybe User)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        NoOp ->
            model ! []

        Increment ->
            ({ model | value = model.value + 1})
              ! []

        Decrement ->
            ({ model | value = max 0 (model.value - 1)})
              ! []

        SetString str ->
            ({ model | inputString = toUpper str })
              ! []

        SetUser user ->
            ({ model | user = user })
              ! []

port increment : (() -> msg) -> Sub msg
port decrement : (() -> msg) -> Sub msg
port setString : (String -> msg) -> Sub msg
port setUser : (Maybe User -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch[ increment <| always Increment
             , decrement <| always Decrement
             , setString SetString
             , setUser SetUser
             ]
