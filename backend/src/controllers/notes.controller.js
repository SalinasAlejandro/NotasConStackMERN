const notesCtl = {};

const NoteModel = require('./../models/Note');

notesCtl.getNotes = async (req, res) => {
    const notes = await NoteModel.find();
    res.json(notes);
}

notesCtl.createNote = async (req, res) => {
    const { title, content, date, author } = req.body;
    const newNote = new NoteModel({
        title: title,
        content: content,
        date: date,
        author: author
    });
    await newNote.save();
    res.json({ message: 'Note saved' });
}

notesCtl.getNote = async (req, res) => {
    const note = await NoteModel.findById(req.params.id);
    res.json(note);
}

notesCtl.updateNote = async (req, res) => {

    const { title, content, author } = req.body;
    await NoteModel.findOneAndUpdate({_id: req.params.id}, {
        title,
        author,
        content
    });
    res.json({ message: 'Note Updated' });

}

notesCtl.deleteNote = async (req, res) => {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note Deleted' });
}

module.exports = notesCtl;