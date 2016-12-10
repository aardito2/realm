module Realm exposing (updateState)

{-| This library exposes a single helper function to help interface with the Realm npm package.

# updateState
@docs updateState
-}

{-| Given an update function and an outgoing port to send your Elm model into JavaScript, returns a new update function which automatically sends the new model to JavaScript after running the update.
-}

updateState : (msg -> model -> (model, Cmd msg)) -> SendPort msg model -> msg -> model -> (model, Cmd msg)
updateState update sendPort = curry <| (uncurry update) >> batchStateCmds sendPort

type alias SendPort msg model = model -> Cmd msg

batchStateCmds : SendPort msg model -> (model, Cmd msg) -> (model, Cmd msg)
batchStateCmds sendPort nextStateAndCmd =
    case nextStateAndCmd of
        (model, cmd) ->
            model ! [cmd, sendPort model]

